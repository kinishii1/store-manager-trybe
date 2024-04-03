const pool = require('./Connection');

const findAll = async () => {
  const [rows] = await pool.query('SELECT * FROM products');
  return rows;
};

const findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);

  if (rows.length === 0) return null;

  return rows[0];
};

const create = async (name) => {
  const [{ insertId }] = await pool.query('INSERT INTO products (name) VALUES (?)', [name]);
  return { id: insertId, name };
};

const update = async (id, name) => {
  await pool.query('UPDATE products SET name = ? WHERE id = ?', [name, id]);
  return { id: Number(id), name };
};

const deleteFromDB = async (id) => {
  await pool.query('DELETE FROM products WHERE id = ?', [id]);
};

module.exports = {
  deleteFromDB,
  update,
  create,
  findAll,
  findById,
};