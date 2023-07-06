require('dotenv').config();
const express = require('express');
const router = express.Router();
const userHandlers = require('../controller/user');

router.post('/signin', userHandlers.signin);
router.post('/signup', userHandlers.signup);

module.exports = router;