require('dotenv').config();
const express = require('express');
const router = express.Router();
const productHandlers = require('../controller/product');

router.get('/all', productHandlers.getAllProducts);
router.get('/:id', productHandlers.getProduct);
router.post('/add-new', productHandlers.createProduct);
router.put('/:id/update', productHandlers.updateProduct);
router.delete('/:id/delete', productHandlers.deleteProduct);

module.exports = router;