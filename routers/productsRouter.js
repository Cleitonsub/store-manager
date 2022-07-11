const express = require('express');

const {
  getAll,
  getById,
  addProduct,
  delProductById,
} = require('../controllers/products');

const { productValidation,
  productIdValidation,
} = require('../middlewares/productValidation');

const router = express.Router();

router.get('/', getAll);
router.post('/', productValidation, addProduct);
router.get('/:id', getById);
router.delete('/:id', productIdValidation, delProductById);

module.exports = router;
