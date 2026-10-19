const { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
require('dotenv').config();

const s3Endpoint = process.env.S3_ENDPOINT || 'https://t8fcc.upcloudobjects.com';
const s3Bucket = process.env.S3_BUCKET || 'b1storage';
const s3Region = process.env.S3_REGION || 'us-east-1';
const accessKeyId = process.env.S3_ACCESS_KEY || '';
const secretAccessKey = process.env.S3_SECRET_KEY || '';
const publicBaseUrl = process.env.S3_PUBLIC_URL || `https://${s3Bucket}.${new URL(s3Endpoint).host}`;

// Initialize S3 Client targeting UpCloud Object Storage
const s3Client = new S3Client({
  endpoint: s3Endpoint,
  region: s3Region,
  credentials: {
    accessKeyId,
    secretAccessKey
  },
  forcePathStyle: true // Needed for UpCloud S3 compatibility
});

/**
 * Upload a binary buffer directly to UpCloud Object Storage (b1storage)
 */
async function uploadToS3(buffer, key, contentType = 'application/octet-stream', acl = 'public-read') {
  const cleanKey = key.replace(/^\/+/, '');
  const command = new PutObjectCommand({
    Bucket: s3Bucket,
    Key: cleanKey,
    Body: buffer,
    ContentType: contentType,
    ACL: acl
  });

  await s3Client.send(command);

  // Return public URL
  const publicUrl = `https://${s3Bucket}.${new URL(s3Endpoint).host}/${cleanKey}`;
  return {
    bucket: s3Bucket,
    key: cleanKey,
    publicUrl
  };
}

/**
 * Generate a pre-signed PUT URL for direct client-to-S3 large file uploads (e.g. video files > 100MB)
 */
async function generatePresignedUploadUrl(key, contentType = 'application/octet-stream', expiresIn = 3600) {
  const cleanKey = key.replace(/^\/+/, '');
  const command = new PutObjectCommand({
    Bucket: s3Bucket,
    Key: cleanKey,
    ContentType: contentType,
    ACL: 'public-read'
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn });
  const publicUrl = `https://${s3Bucket}.${new URL(s3Endpoint).host}/${cleanKey}`;

  return {
    uploadUrl,
    publicUrl,
    key: cleanKey,
    expiresIn
  };
}

/**
 * List files in the bucket under an optional folder prefix
 */
async function listFiles(prefix = '', maxKeys = 100) {
  const command = new ListObjectsV2Command({
    Bucket: s3Bucket,
    Prefix: prefix,
    MaxKeys: maxKeys
  });

  const response = await s3Client.send(command);
  const items = (response.Contents || []).map(item => ({
    key: item.Key,
    size: item.Size,
    lastModified: item.LastModified,
    publicUrl: `https://${s3Bucket}.${new URL(s3Endpoint).host}/${item.Key}`
  }));

  return {
    bucket: s3Bucket,
    prefix,
    count: items.length,
    items
  };
}

/**
 * Delete a file by key
 */
async function deleteFromS3(key) {
  const cleanKey = key.replace(/^\/+/, '');
  const command = new DeleteObjectCommand({
    Bucket: s3Bucket,
    Key: cleanKey
  });

  return await s3Client.send(command);
}

module.exports = {
  s3Client,
  s3Bucket,
  publicBaseUrl,
  uploadToS3,
  generatePresignedUploadUrl,
  listFiles,
  deleteFromS3
};
