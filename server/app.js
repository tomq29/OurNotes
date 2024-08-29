require('dotenv').config();
const path = require('path');
const express = require('express');
const fs = require('fs');
const http = require('http'); // Import Node's HTTP module
const https = require('https'); // Import Node's HTTP module
// const socketIo = require('socket.io'); // Import Socket.IO

const serverConfig = require('./config/serverConfig');
// const indexRouter = require('./routes/index.routes');
const apiRouter = require('./routes/api/api.routes');
// const websocketHandler = require('./sockets/websocketHandler');

const app = express();

const PORT_HTTP = process.env.PORT_HTTP ?? 3000;
const PORT_HTTPS = process.env.PORT_HTTPS ?? 3000;

const sslOptions = {
  key: fs.readFileSync(
    path.join(
      __dirname,
      'public',
      '.well-known',
      'acme-challenge',
      'privkey.pem'
    )
  ),
  cert: fs.readFileSync(
    path.join(
      __dirname,
      'public',
      '.well-known',
      'acme-challenge',
      'fullchain.pem'
    )
  ),
};

//
serverConfig(app);

app.use(
  '/.well-known/acme-challenge',
  express.static(path.join(__dirname, 'public/.well-known/acme-challenge'))
);

//
const distFolder = path.join(__dirname, 'public', 'dist');

app.use(express.static(distFolder));

//
app.use('/api', apiRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(distFolder, 'index.html'));
});

//
const server = http.createServer(app);

// const httpsServer = https.createServer(sslOptions, app);

// const io = socketIo(server);

// io.on('connection', (socket) => {
//   // Set up WebSocket connection using y-websocket utilities
//   // setupWSConnection(socket);
//   console.log('A user connected');

//   socket.on('disconnect', () => {
//       console.log('User disconnected');
//   });
// });

server.listen(PORT_HTTP, () => {
  console.log(`Server starter at ${PORT_HTTP} port`);
});

// httpsServer.listen(PORT_HTTPS, () => {
//   console.log(`Server starter at ${PORT_HTTPS} port`);
// });

/// Редирект с http

// const httpApp = express();

// httpApp.get("*", (req, res) => {
//   res.redirect(`https://${req.headers.host}${req.url}`);
// });

// http.createServer(httpApp).listen(PORT_HTTP, () => {
//   console.log("HTTP Server running on port 80 (redirecting to HTTPS)");
// });
