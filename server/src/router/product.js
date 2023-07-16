require('dotenv').config();
const express = require('express');
const router = express.Router();
const productHandlers = require('../controller/product');
const authHandlers = require('../auth/auth');
const cookieParser = require('cookie-parser');

router.get('/productsseeder', productHandlers.productsSeeder);

router.get('/all', productHandlers.getAllProducts);
router.get('/:productId', productHandlers.getProduct);
// Secondary images
router.get('/:productId/images', productHandlers.getImages);
// Comments
router.get('/:productId/comment/all', productHandlers.getAllComments);

// Mur d'authentification
router.use(cookieParser());
router.use(authHandlers.verifyJWT);

router.post('/add-new', productHandlers.createProduct);
router.put('/:productId', authHandlers.isProductAuthor, productHandlers.updateProduct);
router.delete('/:productId', authHandlers.isProductAuthor, productHandlers.deleteProduct);

// Secondary images
router.post('/:productId/images', authHandlers.isProductAuthor, productHandlers.createImage);
router.delete('/:productId/images/:imageId', authHandlers.isProductAuthor, productHandlers.deleteImage);

// Comments
router.post('/:productId/comment/add-new', productHandlers.createComment);
router.put('/:productId/comment/:commentId', authHandlers.isCommentAuthor, productHandlers.updateComment);
router.delete('/:productId/comment/:commentId', authHandlers.isCommentAuthor, productHandlers.deleteComment);

module.exports = router;