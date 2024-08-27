require('dotenv').config();
const express = require('express');
const http = require('http'); // Import Node's HTTP module
const socketIo = require('socket.io'); // Import Socket.IO

const serverConfig = require('./config/serverConfig');
const indexRouter = require('./routes/index.routes');
const websocketHandler = require('./sockets/websocketHandler');

const PORT = process.env.PORT ?? 3000;

const app = express();

//
serverConfig(app);

//
app.use('/', indexRouter);


//
const server = http.createServer(app);

const io = socketIo(server);

websocketHandler(io);



server.listen(PORT, () => {
  console.log(`Server starter at ${PORT} port`);
});
