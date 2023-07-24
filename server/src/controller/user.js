const Database = require('../database/Database');
const db = new Database();
db.connect();
const User = require('../model/User');
const user = new User(db.promisePool);
const mailer = require('../mail/mailer');
const uid = require('uid2');

const signup = async(req, res) => {
    const {firstname, lastname, email, avatar_cloud} = req.body;
    const hashedPassword = req.hashedPassword;

    try{
        const tokenSignupMailValidation = uid(32);
        await user.createUser(firstname, lastname, email, hashedPassword, avatar_cloud, tokenSignupMailValidation);
        const info = await mailer.sendMail({
            from: "'LeCoinCoin' <no-reply@lecoincoin.com>",
            to: email,
            subject: 'Account created successfully !!!',
            text: 'Congratulation ! Your account was sucessfully created',
            html: `<p>Please, you must validate your account before log in first time using this link : <a href="${process.env.URL_FRONTEND}?token=${tokenSignupMailValidation}" target="_blank">Email account validation</a></p>`
        });
        console.log(info);
        res.json({'user': {firstname, lastname, email, avatar_cloud}});
    }catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}

const signin = async(req, res) => {
    const {email} = req.body;

    try{
        const userProfile = await user.getUser(email);
        res.append('Header', 'Bearer');
        res.cookie('lecoincoin', req.token);
        res.json({'user': userProfile});
    }catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}

const updateProfile = async(req, res) => {
    const {firstname, lastname, avatar_cloud} = req.body;
    const email = req.payloadJWT.email;

    try{
        const userProfile = await user.updateUser(firstname, lastname, email, avatar_cloud);
        res.json({'user': userProfile});
    }catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}

const deleteProfile = async(req, res) => {
    const email = req.payloadJWT.email;

    try{
        await user.deleteUser(email);
        res.sendStatus(200);
    }catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}

const usersSeeder = (req, res) => {
    try{
        user.usersSeeder();
        res.sendStatus(200);
    }catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}

module.exports = {
    signin,
    signup,
    updateProfile,
    deleteProfile,
    usersSeeder
}