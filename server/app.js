require('dotenv').config();
const express = require('express');
const path = require('path');
const http = require('http'); // Import Node's HTTP module
const https = require('https'); // Import Node's HTTP module

const serverConfig = require('./config/serverConfig');

const apiRouter = require('./routes/api/api.routes');
const sslOptions = require('./utils/sslOption');

const PORT = process.env.PORT ?? 3000;

const PORT_HTTPS = process.env.PORT_HTTPS ?? 3000;

const app = express();

app.use(
  '/.well-known/acme-challenge',

  express.static(path.join(__dirname, 'public/.well-known/acme-challenge'))
);

//
serverConfig(app);

const distFolder = path.join(__dirname, 'public', 'dist');

app.use(express.static(distFolder));

//
app.use('/api', apiRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(distFolder, 'index.html'));
});

//
// const server = http.createServer(app);

const httpsServer = https.createServer(sslOptions, app);

// server.listen(PORT, () => {
//   console.log(`Server starter at ${PORT} port`);
// });

httpsServer.listen(PORT_HTTPS, () => {
  console.log(`Server starter at ${PORT_HTTPS} port`);
});

// Редирект с http

const httpApp = express();

httpApp.get('*', (req, res) => {
  res.redirect(`https://${req.headers.host}${req.url}`);
});

http.createServer(httpApp).listen(PORT, () => {
  console.log(`HTTP Server running on port ${PORT} (redirecting to HTTPS)`);
});
