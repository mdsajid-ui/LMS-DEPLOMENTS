const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const uploadRouter = require('./routes/upload');
const apiRouter = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend Vite dev server (localhost:5173) and production domain
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// API Endpoints
app.use('/api/upload', uploadRouter);
app.use('/api', apiRouter);

// Root healthcheck route
app.get('/', (req, res) => {
  res.json({
    name: 'DV Analytics LMS API Server',
    version: '1.0.0',
    status: 'online',
    storage: {
      provider: 'UpCloud Object Storage (S3)',
      bucket: process.env.S3_BUCKET || 'b1storage',
      endpoint: process.env.S3_ENDPOINT || 'https://t8fcc.upcloudobjects.com'
    },
    database: {
      dialect: 'MySQL',
      name: process.env.DB_NAME || 'dv_analytics_lms'
    },
    endpoints: [
      'POST /api/upload',
      'POST /api/upload/presign',
      'GET /api/upload/files',
      'GET /api/health',
      'GET /api/sessions',
      'GET /api/resumes',
      'GET /api/assignments',
      'GET /api/fees'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 DV Analytics LMS Backend Server running on port ${PORT}`);
  console.log(`☁️  UpCloud S3 Storage: ${process.env.S3_ENDPOINT} (Bucket: ${process.env.S3_BUCKET})`);
  console.log(`🗄️  SQL Database Target: ${process.env.DB_NAME} at ${process.env.DB_HOST}:${process.env.DB_PORT}`);
  console.log(`====================================================`);
});

module.exports = app;
