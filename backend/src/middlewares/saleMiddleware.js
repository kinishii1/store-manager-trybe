const validateCreateSale = (req, res, next) => {
  const sale = req.body;
  const isValidProductId = sale.every((item) => item.productId);
  if (!isValidProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  const isValidQuantity = sale.every((item) => item.quantity !== undefined);
  if (!isValidQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  const isValidQuantityValue = sale.every((item) => item.quantity > 0);
  if (!isValidQuantityValue) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity === undefined) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (quantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = {
  validateQuantity,
  validateCreateSale,
};