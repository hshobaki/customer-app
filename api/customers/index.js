const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
let pool;
function getPool(){
  if (!pool){
    pool = new Pool({ connectionString, max: 1 });
  }
  return pool;
}

module.exports = async (req, res) => {
  const pool = getPool();
  try {
    if (req.method === 'GET'){
      const { rows } = await pool.query('SELECT * FROM customers ORDER BY id');
      return res.status(200).json(rows);
    }

    if (req.method === 'POST'){
      const { name, email, phone } = req.body;
      const { rows } = await pool.query(
        'INSERT INTO customers (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
        [name, email, phone]
      );
      return res.status(201).json(rows[0]);
    }

    res.setHeader('Allow', 'GET,POST');
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err){
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
