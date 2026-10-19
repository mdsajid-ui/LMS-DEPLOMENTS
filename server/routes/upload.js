const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadToS3, generatePresignedUploadUrl, listFiles } = require('../services/s3Service');

// Use memory storage for fast in-memory streaming to UpCloud S3
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100 MB max for direct multipart
  }
});

/**
 * POST /api/upload
 * Upload a single file to UpCloud Object Storage (b1storage)
 * Form fields:
 * - file: the binary file
 * - folder: optional destination folder ('resumes', 'materials', 'videos', 'assignments', 'receipts')
 */
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const folder = (req.body.folder || 'uploads').replace(/[^a-zA-Z0-9_\-\/]/g, '');
    const timestamp = Date.now();
    const sanitizedOriginal = path.basename(req.file.originalname).replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const s3Key = `${folder}/${timestamp}_${sanitizedOriginal}`;

    const uploadResult = await uploadToS3(
      req.file.buffer,
      s3Key,
      req.file.mimetype || 'application/octet-stream'
    );

    res.json({
      success: true,
      message: 'File successfully uploaded to UpCloud Object Storage',
      data: {
        originalName: req.file.originalname,
        size: req.file.size,
        mimeType: req.file.mimetype,
        s3Key: uploadResult.key,
        bucket: uploadResult.bucket,
        url: uploadResult.publicUrl
      }
    });
  } catch (error) {
    console.error('S3 Upload Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to upload to UpCloud Object Storage',
      details: error.message
    });
  }
});

/**
 * POST /api/upload/presign
 * Generates pre-signed URL for direct browser-to-S3 upload (great for 500MB+ video lectures)
 */
router.post('/presign', async (req, res) => {
  try {
    const { fileName, fileType, folder = 'videos' } = req.body;
    if (!fileName) {
      return res.status(400).json({ success: false, error: 'fileName is required' });
    }

    const sanitized = path.basename(fileName).replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const s3Key = `${folder}/${Date.now()}_${sanitized}`;

    const presignedData = await generatePresignedUploadUrl(
      s3Key,
      fileType || 'application/octet-stream',
      3600 // 1 hour expiration
    );

    res.json({
      success: true,
      data: presignedData
    });
  } catch (error) {
    console.error('Presign URL generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate pre-signed upload URL',
      details: error.message
    });
  }
});

/**
 * GET /api/upload/files
 * Browse files stored in UpCloud Object Storage
 */
router.get('/files', async (req, res) => {
  try {
    const prefix = req.query.prefix || '';
    const limit = parseInt(req.query.limit || '50', 10);
    const result = await listFiles(prefix, limit);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('List files error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to list files from UpCloud Object Storage',
      details: error.message
    });
  }
});

module.exports = router;
