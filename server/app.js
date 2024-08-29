require('dotenv').config();
const path = require('path');
const express = require('express');
const http = require('http'); // Import Node's HTTP module
// const socketIo = require('socket.io'); // Import Socket.IO

const serverConfig = require('./config/serverConfig');
// const indexRouter = require('./routes/index.routes');
const apiRouter = require('./routes/api/api.routes');
// const websocketHandler = require('./sockets/websocketHandler');

const PORT = process.env.PORT ?? 3000;
const distFolder = path.join(__dirname, 'public', 'dist');

const app = express();

//
serverConfig(app);

app.use(express.static(distFolder));

//
app.use('/api', apiRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(distFolder, 'index.html'));
});

//
const server = http.createServer(app);

// const io = socketIo(server);

// io.on('connection', (socket) => {
//   // Set up WebSocket connection using y-websocket utilities
//   // setupWSConnection(socket);
//   console.log('A user connected');

//   socket.on('disconnect', () => {
//       console.log('User disconnected');
//   });
// });

server.listen(PORT, () => {
  console.log(`Server starter at ${PORT} port`);
});
