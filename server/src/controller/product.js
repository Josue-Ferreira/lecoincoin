const Database = require('../database/Database');
const db = new Database();
db.connect();
const Product = require('../model/Product');
const product = new Product(db.promisePool);

const getAllProducts = async(req, res) => {
    try{
        const products = await product.getAll();
        res.json({'products': products});
    }catch(e){
        console.error(e);
    }
}

const getProduct = async(req, res) => {
    const {id} = req.params;

    try{
        const productAlone = await product.get(id);
        res.json({'product': productAlone});
    }catch(e){
        console.error(e);
    }
}

const createProduct = async(req, res) => {
    const {name, price, description, user_id} = req.body;

    try{
        await product.create(name, price, description, user_id);
        res.sendStatus(200);
    }catch(e){
        console.error(e);
    }
}

const updateProduct = async(req, res) => {
    const {name, price, description} = req.body;
    const {id} = req.params;

    try{
        const productAlone = await product.update(name, price, description, id);
        res.json({'product': productAlone});
    }catch(e){
        console.error(e);
    }
}

const deleteProduct = async(req, res) => {
    const {id} = req.params;

    try{
        await product.delete(id);
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
    deleteProduct
}