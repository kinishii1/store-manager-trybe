const SalesService = require('../services/SalesService');
const httpStatusCode = require('../httpStatusCode');

const getAllSales = async (_req, res) => {
  const sales = await SalesService.getAllSales();

  if (!sales) {
    return res.status(httpStatusCode.NOT_FOUND).json({ message: 'Sales not found' }); 
  }

  res.status(httpStatusCode.OK).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const sale = await SalesService.getSaleById(id);

  if (!sale) {
    return res.status(httpStatusCode.NOT_FOUND).json({ message: 'Sale not found' }); 
  }
  
  res.status(httpStatusCode.OK).json(sale);
};

const createSales = async (req, res) => {
  try {
    const salesData = req.body;
    const newSale = await SalesService.createSales(salesData);

    res.status(httpStatusCode.CREATED).json(newSale);
  } catch (error) {
    res.status(httpStatusCode.NOT_FOUND).json({ message: error.message });
  }
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  try {
    await SalesService.deleteSale(id);
    res.status(httpStatusCode.NO_CONTENT).end();
  } catch (error) {
    res.status(httpStatusCode.NOT_FOUND).json({ message: error.message });
  }
};

const updateSale = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;

  try {
    const updatedSale = await SalesService.updateSale(saleId, productId, quantity);
    res.status(httpStatusCode.OK).json(updatedSale);
  } catch (error) {
    res.status(httpStatusCode.NOT_FOUND).json({ message: error.message });
  }
};

module.exports = {
  updateSale,
  deleteSale,
  createSales,
  getAllSales,
  getSaleById,
};