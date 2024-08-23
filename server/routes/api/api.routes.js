const authRouter = require('./auth.routes');
const tokenRouter = require('./token.routes');
const textRouter = require('./notesText.routes');
const notesRouter = require('./notes.routes');
const folderRouter = require('./folder.routes');
const pairsRouter = require('./pairs.routes');

const apiRouter = require('express').Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/tokens', tokenRouter);
apiRouter.use('/notes', notesRouter);
apiRouter.use('/folders', folderRouter);
apiRouter.use('/text', textRouter);
apiRouter.use('/pairs', pairsRouter);

module.exports = apiRouter;
