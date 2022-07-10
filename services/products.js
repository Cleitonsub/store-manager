const productModel = require('../models/products');

const getAll = async () => {
  const products = await productModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productModel.getById(id);
  if (!product) return null;
  return product;
};

const addProduct = async (name) => {
  if (!name || typeof name !== 'string') return null;
  const product = await productModel.addProduct(name);
  return product;
};

module.exports = {
  getAll,
  getById,
  addProduct,
};