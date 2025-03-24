const pool = require('./db');

async function testDB() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('PostgreSQL Connected:', res.rows[0]);
  } catch (err) {
    console.error('Error connecting to PostgreSQL:', err);
  } finally {
    pool.end();
  }
}

testDB();
