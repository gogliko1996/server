"use strict";
const expressRoute = require('express');
const loginUsers = require('../userAvtorization/userLogin/userLogIn.ts');
const userRegister = require('../userAvtorization/userRegister/register.ts');
const router = expressRoute.Router();
router.post('/login', loginUsers.login);
router.post('/register', userRegister);
router.post('/auth/refresh-token', loginUsers.usersRefreshToken);
router.get('/protected', loginUsers.protectedRoute);
module.exports = router;
