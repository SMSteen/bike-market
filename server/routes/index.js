const bikeRouter = require('./bike.routes');
const authRouter = require('./auth.routes');
const router = require('express').Router();

module.exports = router.use('/auth', authRouter).use('/bikes', bikeRouter);