const express = require('express');
const ProductRoutes = require('./routes/ProductsRoutes');
const SalesRoutes = require('./routes/SalesRoutes');

const app = express();

app.use(express.json());
app.use('/products', ProductRoutes);
app.use('/sales', SalesRoutes);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
