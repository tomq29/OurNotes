require('dotenv').config();
const express = require('express');
const http = require('http'); // Import Node's HTTP module

const serverConfig = require('./config/serverConfig');

const apiRouter = require('./routes/api/api.routes');

const PORT = process.env.PORT ?? 3000;

const app = express();

//
serverConfig(app);

//
app.use('/api', apiRouter);

//
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server starter at ${PORT} port`);
});
