const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/customerdb';
const pool = new Pool({ connectionString });

async function init() {
  const create = `
    CREATE TABLE IF NOT EXISTS customers (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT
    );
  `;
  await pool.query(create);
}

function query(text, params) {
  return pool.query(text, params);
}

module.exports = { init, query, pool };
