const Database = require('../database/Database');
const db = new Database();
db.connect();
const User = require('../model/User');
const user = new User(db.promisePool);

const signin = async(req, res) => {
    try{
        const userProfile = await user.getUser(req.body.email);
        res.json({'user': userProfile});
    }catch(e){
        console.error(e);
    }
}

const signup = (req, res) => {
    res.status(200).send('Hello from router')
}

const usersSeeder = (req, res) => {
    try{
        user.usersSeeder();
        res.sendStatus(200);
    }catch(e){
        console.error(e);
    }
}

module.exports = {
    signin,
    signup,
    usersSeeder
}