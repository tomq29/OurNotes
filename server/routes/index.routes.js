const apiRouter = require('./api/api.routes');
const path = require('path');

const indexRouter = require('express').Router();

indexRouter.use('/api', apiRouter);
indexRouter.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dist/index.html'));
  // res.send('hello');
});

module.exports = indexRouter;
