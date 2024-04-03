const ProductRoutes = require('express').Router();
const { validateCreateProduct } = require('../middlewares/productMiddleware');

const ProductsController = require('../controllers/ProductsController');

ProductRoutes.get('/search', ProductsController.searchProduct);
ProductRoutes.get('/', ProductsController.getAllProducts);
ProductRoutes.get('/:id', ProductsController.getProductById);
ProductRoutes.post('/', validateCreateProduct, ProductsController.createProduct);
ProductRoutes.put('/:id', validateCreateProduct, ProductsController.updateProduct);
ProductRoutes.delete('/:id', ProductsController.deleteProduct);

module.exports = ProductRoutes;