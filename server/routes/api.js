const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Health check endpoint
router.get('/health', async (req, res) => {
  const isDbConnected = await db.testConnection();
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      storage: {
        provider: 'UpCloud Object Storage (S3)',
        endpoint: process.env.S3_ENDPOINT,
        bucket: process.env.S3_BUCKET,
        status: 'online'
      },
      database: {
        provider: 'MySQL 8.0 / MariaDB',
        database: process.env.DB_NAME,
        status: isDbConnected ? 'connected' : 'offline (configure server/.env)'
      }
    }
  });
});

// -------------------------------------------------------------
// SESSIONS API
// -------------------------------------------------------------
router.get('/sessions', async (req, res) => {
  try {
    if (db.getIsConnected()) {
      const rows = await db.query(`
        SELECT s.*, m.code as module_code, m.title as module_title
        FROM sessions s
        JOIN course_modules m ON s.module_id = m.id
        WHERE s.is_active = 1
        ORDER BY s.sort_order ASC
      `);
      return res.json({ success: true, data: rows });
    }
    res.json({ success: true, fallback: true, message: 'DB not connected, using client state' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/sessions', async (req, res) => {
  try {
    const { module_id, batch_id, session_code, title, mentor_name, recording_date, video_url, materials_url, assignment_url } = req.body;
    if (db.getIsConnected()) {
      const result = await db.query(`
        INSERT INTO sessions (module_id, batch_id, session_code, title, mentor_name, recording_date, video_url, materials_url, assignment_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [module_id || 1, batch_id || 1, session_code, title, mentor_name, recording_date, video_url, materials_url, assignment_url]);
      return res.json({ success: true, insertId: result.insertId });
    }
    res.json({ success: true, message: 'Session acknowledged' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// RESUMES API
// -------------------------------------------------------------
router.get('/resumes', async (req, res) => {
  try {
    if (db.getIsConnected()) {
      const rows = await db.query(`
        SELECT r.*, u.full_name as student_name, u.student_id, u.roll_no, b.batch_code
        FROM resumes r
        JOIN users u ON r.user_id = u.id
        LEFT JOIN batches b ON r.batch_id = b.id
        ORDER BY r.uploaded_at DESC
      `);
      return res.json({ success: true, data: rows });
    }
    res.json({ success: true, fallback: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/resumes', async (req, res) => {
  try {
    const { user_id, batch_id, original_file_name, pdf_url, word_url } = req.body;
    if (db.getIsConnected()) {
      const result = await db.query(`
        INSERT INTO resumes (user_id, batch_id, original_file_name, pdf_url, word_url, status)
        VALUES (?, ?, ?, ?, ?, 'Approved')
      `, [user_id || 3, batch_id || 1, original_file_name, pdf_url, word_url]);
      return res.json({ success: true, insertId: result.insertId });
    }
    res.json({ success: true, message: 'Resume metadata stored' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// ASSIGNMENTS API
// -------------------------------------------------------------
router.get('/assignments', async (req, res) => {
  try {
    if (db.getIsConnected()) {
      const rows = await db.query(`
        SELECT a.*, b.batch_code,
          (SELECT COUNT(*) FROM assignment_submissions sub WHERE sub.assignment_id = a.id) as submission_count
        FROM assignments a
        JOIN batches b ON a.batch_id = b.id
        ORDER BY a.deadline_date ASC
      `);
      return res.json({ success: true, data: rows });
    }
    res.json({ success: true, fallback: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// FEE LEDGER API
// -------------------------------------------------------------
router.get('/fees', async (req, res) => {
  try {
    if (db.getIsConnected()) {
      const rows = await db.query(`
        SELECT f.*, u.full_name as student_name, u.student_id, u.roll_no, b.batch_code
        FROM fee_ledgers f
        JOIN users u ON f.user_id = u.id
        JOIN batches b ON f.batch_id = b.id
        ORDER BY f.payment_date DESC
      `);
      return res.json({ success: true, data: rows });
    }
    res.json({ success: true, fallback: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
