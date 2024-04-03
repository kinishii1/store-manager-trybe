const Sales = require('../models/Sales');
const Product = require('../models/Product');

const getAllSales = async () => Sales.findAll();

const getSaleById = async (id) => {
  const sale = await Sales.findById(id);

  if (!sale) return null;

  return sale;
};

const createSales = async (salesData) => {
  const isValidProductId = await Promise.all(salesData.map(async (item) => {
    const product = await Sales.findById(item.productId);
    return product !== null;
  }));

  if (!isValidProductId.every((valid) => valid)) {
    throw new Error('Product not found');
  }
  const newSale = await Sales.create(salesData);

  return newSale;
};

const deleteSale = async (id) => {
  const sale = await Sales.findById(id);
  if (!sale) throw new Error('Sale not found');

  await Sales.deleteFromDB(id);
};

const updateSale = async (saleId, productId, quantity) => {
  const sale = await Sales.findById(saleId);
  if (!sale) throw new Error('Sale not found');

  const product = await Product.findById(productId);
  if (!product) throw new Error('Product not found in sale');

  const updatedSale = await Sales.updateSale(saleId, productId, quantity);

  return updatedSale;
};

module.exports = {
  updateSale,
  deleteSale,
  createSales,
  getAllSales,
  getSaleById,
};
