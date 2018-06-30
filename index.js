'use strict';
const {User} = require('./models/user-model');
const {userRouter} = require('./routes/user-router');
const {authRouter} = require('./routes/auth-router');
const {localStrategy, jwtStrategy} = require('./auth/strategies');

module.exports = {User, userRouter, authRouter, localStrategy, jwtStrategy};