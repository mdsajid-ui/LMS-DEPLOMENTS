const mysql = require('mysql2/promise');
require('dotenv').config();

const isSsl = process.env.DB_SSL === 'true' || (process.env.DB_HOST && process.env.DB_HOST.includes('tidbcloud'));

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'dv_analytics_lms',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ...(isSsl ? { ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true } } : {})
};

let pool = null;
let isConnected = false;

try {
  pool = mysql.createPool(dbConfig);
} catch (err) {
  console.warn('⚠️ Warning: MySQL pool could not be initialized:', err.message);
}

async function testConnection() {
  if (!pool) return false;
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    isConnected = true;
    console.log('✅ Connected to MySQL Database:', dbConfig.database, 'at', dbConfig.host);
    return true;
  } catch (err) {
    isConnected = false;
    console.warn(`⚠️ Database notice: Could not connect to MySQL at ${dbConfig.host}:${dbConfig.port} (${err.code || err.message}). Operating in hybrid storage mode.`);
    return false;
  }
}

// Initial connection check
testConnection();

module.exports = {
  pool,
  testConnection,
  getIsConnected: () => isConnected,
  query: async (sql, params) => {
    if (!pool || !isConnected) {
      throw new Error('Database is currently offline. Please configure your MySQL credentials in server/.env');
    }
    const [rows, fields] = await pool.execute(sql, params);
    return rows;
  }
};
