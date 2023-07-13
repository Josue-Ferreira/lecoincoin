const Database = require('../database/Database');
const db = new Database();
db.connect();
const Product = require('../model/Product');
const product = new Product(db.promisePool);
const User = require('../model/User');
const user = new User(db.promisePool);

const getAllProducts = async(req, res) => {
    try{
        const products = await product.getAll();
        res.json({'products': products});
    }catch(e){
        console.error(e);
    }
}

const getProduct = async(req, res) => {
    const {productId} = req.params;
    
    try{
        const productAlone = await product.get(productId);
        res.json({'product': productAlone});
    }catch(e){
        console.error(e);
    }
}

const createProduct = async(req, res) => {
    const {name, price, description} = req.body; 
    const email = req.payloadJWT.email;

    try{
        const userCredentials = await user.getUserCredentials(email);
        await product.create(name, price, description, userCredentials.id);
        res.sendStatus(200);
    }catch(e){
        console.error(e);
    }
}

const updateProduct = async(req, res) => {
    const {name, price, description} = req.body;
    const {productId} = req.params;

    try{
        const productAlone = await product.update(name, price, description, productId);
        res.json({'product': productAlone});
    }catch(e){
        console.error(e);
    }
}

const deleteProduct = async(req, res) => {
    const {productId} = req.params;

    try{
        await product.delete(productId);
        res.sendStatus(200);
    }catch(e){
        console.error(e);
    }
}

const productsSeeder = async(req, res) => {
    try{
        await product.seeder();
        res.sendStatus(200);
    }catch(e){
        console.error(e);
    }
}

const getAllComments = async(req, res) => {
    const {productId} = req.params;

    try{
        const comments = await product.getAllComments(productId); 
        res.json({'comments' : comments});
    }catch(e){
        console.error(e);
    }
}

const createComment = async(req, res) => {
    const {comment} = req.body; 
    const {productId} = req.params;
    const email = req.payloadJWT.email;

    try{
        const userCredentials = await user.getUserCredentials(email);
        await product.createComment(comment, userCredentials.id, productId);
        res.sendStatus(200);
    }catch(e){
        console.error(e);
    }
}

const updateComment = async(req, res) => {
    const {commentId} = req.params;
    const {comment} = req.body;

    try{
        const commentAlone = await product.updateComment(comment, commentId);
        res.json({'comment': commentAlone});
    }catch(e){
        console.error(e);
    }
}

const deleteComment = async(req, res) => {
    const {commentId} = req.params;

    try{
        await product.deleteComment(commentId);
        res.sendStatus(200);
    }catch(e){
        console.error(e);
    }
}

const createImage = async(req, res) => {
    const {description, url} = req.body;
    const {productId} = req.params;

    try{
        await product.createImage(description, url, 0, productId);
        res.sendStatus(200);
    }catch(e){
        console.error(e);
    }
}

const getImages = async(req, res) => {
    const {productId} = req.params;

    try{
        const images = await product.getImages(productId);
        res.json({"images": images});
    }catch(e){
        console.error(e);
    }
}

const deleteImage = async(req, res) => {
    const {imageId} = req.params;

    try{
        await product.deleteImage(imageId);
        res.sendStatus(200);
    }catch(e){
        console.error(e);
    }
}

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    productsSeeder,
    getAllComments,
    createComment,
    updateComment,
    deleteComment,
    createImage,
    getImages,
    deleteImage
}