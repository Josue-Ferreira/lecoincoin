require('dotenv').config();
const express = require('express');
const router = express.Router();
const userHandlers = require('../controller/user');

router.post('/signin', userHandlers.signin);
router.post('/signup', userHandlers.signup);
router.get('/usersseeder',userHandlers.usersSeeder);

module.exports = router;