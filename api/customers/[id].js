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
  const { id } = req.query;
  try {
    if (req.method === 'GET'){
      const { rows } = await pool.query('SELECT * FROM customers WHERE id=$1', [id]);
      if (!rows.length) return res.status(404).json({ error: 'Not found' });
      return res.json(rows[0]);
    }

    if (req.method === 'PUT'){
      const { name, email, phone } = req.body;
      const { rows } = await pool.query(
        'UPDATE customers SET name=$1, email=$2, phone=$3 WHERE id=$4 RETURNING *',
        [name, email, phone, id]
      );
      if (!rows.length) return res.status(404).json({ error: 'Not found' });
      return res.json(rows[0]);
    }

    if (req.method === 'DELETE'){
      const { rowCount } = await pool.query('DELETE FROM customers WHERE id=$1', [id]);
      if (!rowCount) return res.status(404).json({ error: 'Not found' });
      return res.json({ success: true });
    }

    res.setHeader('Allow', 'GET,PUT,DELETE');
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err){
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
