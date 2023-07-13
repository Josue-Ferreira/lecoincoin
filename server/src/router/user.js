require('dotenv').config();
const express = require('express');
const router = express.Router();
const userHandlers = require('../controller/user');
const authHandlers = require('../auth/auth');
const cookieParser = require('cookie-parser');

router.get('/usersseeder', userHandlers.usersSeeder);
router.get('/signup-validation/:tokenSignupMailValidation', authHandlers.signupValidation);

// Mur de vérification si user exist
router.use(authHandlers.emailAccountExist);

router.post('/signup', authHandlers.hashPassword, userHandlers.signup);
router.post('/signin', authHandlers.checkCredentials, authHandlers.createCookieJWT, userHandlers.signin);

// Mur d'authentification
router.use(cookieParser());
router.use(authHandlers.verifyJWT);

router.put('/', userHandlers.updateProfile);
router.delete('/', userHandlers.deleteProfile);

module.exports = router;