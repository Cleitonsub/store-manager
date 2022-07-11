const salesService = require('../services/sales');
const {
  OK,
  NOT_FOUND,
} = require('../helpers/httpStatusCode');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  res.status(OK).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const sale = await salesService.getById(id);

  if (!sale) return res.status(NOT_FOUND).json({ message: 'Sale not found' });

  res.status(OK).json(sale);
};

module.exports = {
  getAll,
  getById,
};