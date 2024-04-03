const ProductService = require('../services/ProductsService');
const httpStatusCode = require('../httpStatusCode');

const getAllProducts = async (req, res) => {
  const products = await ProductService.getAllProducts();
  if (!products) return res.status(404).json({ message: 'Products not found' });
  res.status(httpStatusCode.OK).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await ProductService.getProductById(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.status(httpStatusCode.OK).json(product);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const product = await ProductService.createProduct(name);
  res.status(httpStatusCode.CREATED).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const product = await ProductService.updateProduct(id, name);
    res.status(httpStatusCode.OK).json(product);
  } catch (error) {
    res.status(httpStatusCode.NOT_FOUND).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await ProductService.deleteProduct(id);
    res.status(httpStatusCode.NO_CONTENT).end();
  } catch (error) {
    res.status(httpStatusCode.NOT_FOUND).json({ message: error.message });
  }
};

const searchProduct = async (req, res) => {
  const { q } = req.query;
  const products = await ProductService.searchProduct(q);
  if (!products) return res.status(404).json({ message: 'Products not found' });
  res.status(httpStatusCode.OK).json(products);
};

module.exports = {
  searchProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  createProduct,
};