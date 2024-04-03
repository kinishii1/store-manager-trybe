const SalesRoutes = require('express').Router();

const SalesController = require('../controllers/SalesController');
const { validateCreateSale, validateQuantity } = require('../middlewares/saleMiddleware');

SalesRoutes.get('/', SalesController.getAllSales);
SalesRoutes.get('/:id', SalesController.getSaleById);
SalesRoutes.post('/', validateCreateSale, SalesController.createSales);
SalesRoutes.delete('/:id', SalesController.deleteSale);
SalesRoutes.put(
  '/:saleId/products/:productId/quantity',
  validateQuantity,
  SalesController.updateSale,
);

module.exports = SalesRoutes;