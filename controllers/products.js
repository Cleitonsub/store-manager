const productService = require('../services/products');
const {
  OK,
  NOT_FOUND,
} = require('../helpers/httpStatusCode');

const getAll = async (_req, res) => {
  const products = await productService.getAll();
  res.status(OK).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const products = await productService.getById(id);

  if (!products) return res.status(NOT_FOUND).json({ message: 'Product not found' });

  res.status(OK).json(products);
};

module.exports = {
  getAll,
  getById,
};
