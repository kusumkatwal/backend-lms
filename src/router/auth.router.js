const express = require('express');
const authCtrl = require('../controller/auth.controller');
const {roleMiddleware} = require('../middleware/auth.middleware');
const authRouter = express();

authRouter.post('/login', authCtrl.login)
authRouter.post('/register', authCtrl.register)
authRouter.get('/', roleMiddleware(['teacher']), authCtrl.getAllUsers);
module.exports = authRouter;