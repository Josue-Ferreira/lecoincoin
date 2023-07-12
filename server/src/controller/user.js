const Database = require('../database/Database');
const db = new Database();
db.connect();
const User = require('../model/User');
const user = new User(db.promisePool);

const signup = async(req, res) => {
    const {firstname, lastname, email, avatar_cloud} = req.body;
    const hashedPassword = req.hashedPassword;

    try{
        await user.createUser(firstname, lastname, email, hashedPassword, avatar_cloud);
        res.sendStatus(200);
    }catch(e){
        console.error(e);
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
    }
}

const updateProfile = async(req, res) => {
    const {firstname, lastname, email, avatar_cloud} = req.body;

    try{
        const userProfile = await user.updateUser(firstname, lastname, email, avatar_cloud);
        res.json({'user': userProfile});
    }catch(e){
        console.error(e);
    }
}

const deleteProfile = async(req, res) => {
    const {email} = req.body;

    try{
        await user.deleteUser(email);
        res.sendStatus(200);
    }catch(e){
        console.error(e);
    }
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
    updateProfile,
    deleteProfile,
    usersSeeder
}