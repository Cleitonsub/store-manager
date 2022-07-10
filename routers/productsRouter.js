const express = require('express');

const {
  getAll,
  getById,
  addProduct,
} = require('../controllers/products');
const productValidation = require('../middlewares/productValidation');

const router = express.Router();

router.get('/', getAll);
router.post('/', productValidation, addProduct);
router.get('/:id', getById);

module.exports = router;
