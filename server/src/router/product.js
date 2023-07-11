require('dotenv').config();
const express = require('express');
const router = express.Router();
const productHandlers = require('../controller/product');

router.get('/all', productHandlers.getAllProducts);
// router.get('/productsseeder', productHandlers.productsSeeder);
router.get('/:id', productHandlers.getProduct);
router.post('/add-new', productHandlers.createProduct);
router.put('/:productId/update', productHandlers.updateProduct);
router.delete('/:productId/delete', productHandlers.deleteProduct);

// Comments
router.get('/:productId/comment/all', productHandlers.getAllComments);
router.post('/:productId/comment/add-new', productHandlers.createComment);
router.put('/:productId/comment/:commentId/update', productHandlers.updateComment);
router.delete('/:productId/comment/:commentId/delete', productHandlers.deleteComment);

module.exports = router;