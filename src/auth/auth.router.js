const express = require('express');
const authCtrl = require('./auth.controller');
const authRouter = express();

authRouter.post('/login', authCtrl.login)
authRouter.post('/register', authCtrl.register)
module.exports = authRouter;