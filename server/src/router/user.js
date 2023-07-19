require('dotenv').config();
const express = require('express');
const router = express.Router();
const userHandlers = require('../controller/user');
const authHandlers = require('../auth/auth');
const cookieParser = require('cookie-parser');

router.get('/usersseeder', userHandlers.usersSeeder);
router.get('/signup-validation/:tokenSignupMailValidation', authHandlers.signupValidation);

router.post('/signup', authHandlers.emailAccountExist, authHandlers.hashPassword, userHandlers.signup);
router.post('/signin', authHandlers.emailAccountExist, authHandlers.checkCredentials, authHandlers.createCookieJWT, userHandlers.signin);

// Mur d'authentification
router.use(cookieParser());
router.use(authHandlers.verifyJWT);

router.put('/', userHandlers.updateProfile);
router.delete('/', userHandlers.deleteProfile);

module.exports = router;