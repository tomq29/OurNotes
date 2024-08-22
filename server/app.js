require('dotenv').config();
const express = require('express');

const serverConfig = require('./config/serverConfig');
const indexRouter = require('./routes/index.routes');

const PORT = process.env.PORT ?? 3000;

const app = express();

//
serverConfig(app);

//
app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`Server starter at ${PORT} port`);
});
