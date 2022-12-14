const productService = require('../services/products');
const productModel = require('../models/products');
const {
  CREATED,
  NO_CONTENT,
  NOT_ACCEPTABLE,
  NOT_FOUND,
  OK,
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

const addProduct = async (req, res) => {
  const { name } = req.body;

  const product = await productService.addProduct(name);

  if (!product) return res.status(NOT_ACCEPTABLE).json({ message: 'Product name not acceptable' });

  res.status(CREATED).json(product);
};

const delProductById = async (req, res) => {
  const { id } = req.params;
  
  await productModel.delProductById(id);

  return res.status(NO_CONTENT).end();
};

module.exports = {
  getAll,
  getById,
  addProduct,
  delProductById,
};
