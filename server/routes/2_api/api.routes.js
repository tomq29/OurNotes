const notesRouter = require('../notes.routes');
const authRouter = require('../3_log reg/auth.routes');

const tokenRouter = require('../4_tokens/token.routes');
const folderRouter = require('../folder.routes');
const textRouter = require('../notesText.routes');

const apiRouter = require('express').Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/tokens', tokenRouter);
apiRouter.use('/notes', notesRouter);
apiRouter.use('/folders', folderRouter);
apiRouter.use('/text', textRouter);

module.exports = apiRouter;
