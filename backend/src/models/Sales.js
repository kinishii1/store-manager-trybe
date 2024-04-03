const camelize = require('camelize');
const pool = require('./Connection');

const findAll = async () => {
  const query = `
  SELECT  sale_id, sales.date, product_id, quantity
  FROM sales_products
  JOIN sales ON sales.id = sales_products.sale_id
  ORDER BY sale_id, product_id;
  `;
  const [rows] = await pool.query(query);
  return camelize(rows);
};

const findById = async (id) => {
  const query = `
  SELECT sales.date, product_id, quantity 
  FROM sales_products
  JOIN sales ON sales.id = sales_products.sale_id
  WHERE sales.id = ?;
  `;
  const [rows] = await pool.query(query, [id]);

  if (rows.length === 0) return null;

  return camelize(rows);
};

const create = async (salesData) => {
  const query1 = 'INSERT INTO sales (date) VALUES (?)';
  const [{ insertId: id }] = await pool.query(query1, [new Date()]);
  const query2 = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
  await Promise.all(salesData.map(async (sale) => {
    const { productId, quantity } = sale; 
    await pool.query(query2, [id, productId, quantity]);
  }));
  return { id,
    itemsSold: [...salesData,
    ] };
};

const deleteFromDB = async (id) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  await pool.query(query, [id]);
};

const updateSale = async (saleId, productId, quantity) => {
  const query = 'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?';
  await pool.query(query, [quantity, saleId, productId]);
  const date = new Date();
  return { date, saleId: Number(saleId), productId: Number(productId), quantity: Number(quantity) };
};

module.exports = {
  updateSale,
  deleteFromDB,
  create,
  findAll,
  findById,
};