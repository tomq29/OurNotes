const authRouter = require('./auth.routes');
const tokenRouter = require('./token.routes');
const notesRouter = require('./notes.routes');
const pairsRouter = require('./pairs.routes');
const colorsRouter = require('./colors.routes');
const usersRouter = require('./users.routes');
const eventsRouter = require('./events.routes');
const eventTypesRouter = require('./eventtypes.routes');

const apiRouter = require('express').Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/tokens', tokenRouter);
apiRouter.use('/notes', notesRouter);
apiRouter.use('/pairs', pairsRouter);
apiRouter.use('/colors', colorsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/events', eventsRouter);
apiRouter.use('/eventtypes', eventTypesRouter);

module.exports = apiRouter;
