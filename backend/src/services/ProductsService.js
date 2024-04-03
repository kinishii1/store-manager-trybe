const Product = require('../models/Product');

const getAllProducts = async () => Product.findAll();

const getProductById = async (id) => {
  const product = await Product.findById(id);

  return product;
};

const createProduct = async (name) => Product.create(name);

const updateProduct = async (id, name) => {
  const foundProduct = await Product.findById(id);
  if (!foundProduct) throw new Error('Product not found');

  const updatedProduct = await Product.update(id, name);
  return updatedProduct;
};

const deleteProduct = async (id) => {
  const foundProduct = await Product.findById(id);
  if (!foundProduct) throw new Error('Product not found');

  await Product.deleteFromDB(id);
};

const searchProduct = async (q) => {
  const products = await Product.findAll();
  return products.filter((product) => product.name.includes(q));
};

module.exports = {
  searchProduct,
  deleteProduct,
  updateProduct,
  createProduct,
  getAllProducts,
  getProductById,
};