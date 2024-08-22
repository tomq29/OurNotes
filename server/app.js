require('dotenv').config();
const express = require('express');
const indexRouter = require('./routes/1_index/index.routes');
const serverConfig = require('./config/serverConfig');

const PORT = process.env.PORT ?? 3000;

const app = express();

//
serverConfig(app)


//
app.use('/', indexRouter )




app.listen(PORT, () => {
  console.log(`Server starter at ${PORT} port`);
});
