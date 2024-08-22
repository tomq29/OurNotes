const apiRouter = require('./api/api.routes');

const indexRouter = require('express').Router();

indexRouter.use('/api', apiRouter);

module.exports = indexRouter;
