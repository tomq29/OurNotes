const apiRouter = require('../2_api/api.routes');

const indexRouter = require('express').Router();

indexRouter.use('/api', apiRouter);

module.exports = indexRouter;
