require('dotenv').config();
const express = require('express');
const router = express.Router();
const productHandlers = require('../controller/product');

router.get('/all', productHandlers.getAllProducts);
// router.get('/productsseeder', productHandlers.productsSeeder);
router.get('/:productId', productHandlers.getProduct);
router.post('/add-new', productHandlers.createProduct);
router.put('/:productId', productHandlers.updateProduct);
router.delete('/:productId', productHandlers.deleteProduct);

// Secondary images
router.get('/:productId/images', productHandlers.getImages);
router.post('/:productId/images', productHandlers.createImage);
router.delete('/:productId/images/:imageId', productHandlers.deleteImage);

// Comments
router.get('/:productId/comment/all', productHandlers.getAllComments);
router.post('/:productId/comment/add-new', productHandlers.createComment);
router.put('/:productId/comment/:commentId', productHandlers.updateComment);
router.delete('/:productId/comment/:commentId', productHandlers.deleteComment);

module.exports = router;