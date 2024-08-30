require('dotenv').config();
const express = require('express');
const path = require('path');
const http = require('http'); // Import Node's HTTP module
const https = require('https'); // Import Node's HTTP module

const serverConfig = require('./config/serverConfig');

const apiRouter = require('./routes/api/api.routes');

// const PORT = process.env.PORT ?? 3000;

const PORT_HTTP = process.env.PORT_HTTP ?? 3000;

const PORT_HTTPS = process.env.PORT_HTTPS ?? 3000;

const app = express();


app.use(
  '/.well-known/acme-challenge',

  express.static(path.join(__dirname, 'public/.well-known/acme-challenge'))
);
//
serverConfig(app);

//
app.use('/', apiRouter);

//
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server starter at ${PORT} port`);
});
