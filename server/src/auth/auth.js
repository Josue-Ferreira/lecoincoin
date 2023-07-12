const argon = require('argon2');
const jwt = require('jsonwebtoken');
const Database = require('../database/Database');
const db = new Database();
db.connect();
const User = require('../model/User');
const user = new User(db.promisePool);
const Product = require('../model/Product');
const product = new Product(db.promisePool);

const emailAccountExist = async(req, res, next) => {
    const {email, signup} = req.body; // signup = true we want no user to exist, signup = null we want user to exist

    try{
        const userExistHashedPassword = await user.getUserCredentials(email);
        if(userExistHashedPassword && !signup){
            req.hashedPassword = userExistHashedPassword.password;
            next();
        }else if(!userExistHashedPassword && signup){
            next();
        }else {
            signup ? res.sendStatus(409) : res.sendStatus(404);
        }
    }catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}

const hashPassword = async(req, res, next) => {
    const {password} = req.body;
    try{
        const hashedPassword = await argon.hash(password);
        req.hashedPassword = hashedPassword;
        delete req.body.password;
        next();
    }catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}

const checkCredentials = async(req, res, next) => {
    const {password} = req.body;

    try{
        if(password && await argon.verify(req.hashedPassword, password)){
            delete req.body.password;
            next();
        }else{
            res.sendStatus(401);
        }
    }catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}

const createCookieJWT = async(req, res, next) => {
    const {email} = req.body; 

    try {
        const token = jwt.sign({email: email}, process.env.JWT_SECRET, {expiresIn: '1h'});
        req.token = token;
        next();
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

const verifyJWT = async(req, res, next) => {
    const token = req.cookies.lecoincoin;
    
    try {
        if(token){
            try {
                req.payloadJWT = jwt.verify(token, process.env.JWT_SECRET);
                next();
            } catch (e) {
                console.error(e);
                res.sendStatus(401);
            }
        }
        else
            res.sendStatus(401);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
}
// A vérifier
const isProductAuthor = async(req, res, next) => {
    const {productId} = req.params;

    try {
        const emailAuthor = await product.getUserAuthor(productId);
        if(emailAuthor === req.payloadJWT.email)
            next();
        else
            res.sendStatus(401);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
}

const isCommentAuthor = async(req, res, next) => {
    // const {productId} = req.params;

    // try {
    //     const emailAuthor = await product.getUserAuthor(productId);
    //     if(emailAuthor === req.payloadJWT.email)
    //         next();
    //     else
    //         res.sendStatus(401);
    // } catch (e) {
    //     console.error(e);
    //     res.sendStatus(500);
    // }
}

module.exports = {
    emailAccountExist,
    hashPassword,
    checkCredentials,
    createCookieJWT,
    verifyJWT,
    isProductAuthor, 
    isCommentAuthor
}