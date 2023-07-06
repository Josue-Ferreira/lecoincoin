require('dotenv').config();
const express = require('express');
const router = express.Router();
const userHandlers = require('../controller/user');

router.post('/signin', userHandlers.signin);
router.post('/signup', userHandlers.signup);
router.put('/update', userHandlers.updateProfile);
router.delete('/delete', userHandlers.deleteProfile);
// router.get('/usersseeder',userHandlers.usersSeeder);

module.exports = router;