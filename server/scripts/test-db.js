require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mysql = require('mysql2/promise');

async function checkDatabase() {
  console.log('--- Testing SQL Database Connection ---');
  console.log('Host:    ', process.env.DB_HOST || 'localhost');
  console.log('Port:    ', process.env.DB_PORT || '3306');
  console.log('User:    ', process.env.DB_USER || 'root');
  console.log('Database:', process.env.DB_NAME || 'dv_analytics_lms');

  const isSsl = process.env.DB_SSL === 'true' || (process.env.DB_HOST && process.env.DB_HOST.includes('tidbcloud'));

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'dv_analytics_lms',
      ...(isSsl ? { ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true } } : {})
    });

    console.log('✅ Connection Successful!');

    const [tables] = await connection.query('SHOW TABLES');
    console.log(`\n📋 Found ${tables.length} tables in database '${process.env.DB_NAME}':`);
    tables.forEach((t, i) => {
      const tableName = Object.values(t)[0];
      console.log(`   ${i + 1}. ${tableName}`);
    });

    const [users] = await connection.query('SELECT count(*) as count FROM users');
    console.log(`\n👥 Enrolled Users/Students in DB: ${users[0].count}`);

    await connection.end();
    console.log('\n🎉 Database is ready for LMS production hosting!');
  } catch (err) {
    console.error('\n❌ Database Connection Failed:');
    console.error('Error Code:', err.code);
    console.error('Message:   ', err.message);
    console.log('\n💡 Next Steps:');
    console.log('1. Make sure MySQL / MariaDB server is running.');
    console.log('2. Check server/.env for correct DB_HOST, DB_USER, DB_PASSWORD, and DB_NAME.');
    console.log('3. Run `mysql -u root -p < database/schema.sql` to initialize tables.');
  }
}

checkDatabase();
