const express = require('express');

const {
  getAll,
  getById,
  addProduct,
} = require('../controllers/products');

const router = express.Router();

router.get('/', getAll);
router.post('/', addProduct);
router.get('/:id', getById);

module.exports = router;
