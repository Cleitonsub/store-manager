const { BAD_REQUEST, UNPROCESSABLE_ENTITY, NOT_FOUND } = require('../helpers/httpStatusCode');
const { getAll } = require('../models/products');

const productValidation = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(BAD_REQUEST).json({ message: '"name" is required' });

  if (name.length < 5) {
    return res.status(UNPROCESSABLE_ENTITY)
      .json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const productIdValidation = async (req, res, next) => {
  const { id } = req.params;

  const allProducts = await getAll();
  const result = allProducts.some((product) => product.id === Number(id));
  if (!result) return res.status(NOT_FOUND).json({ message: 'Product not found' });

  next();
};
module.exports = {
  productValidation,
  productIdValidation,
};
