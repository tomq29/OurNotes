require('dotenv').config();
const path = require('path');
const express = require('express');
const fs = require('fs');
const http = require('http'); // Import Node's HTTP module
const https = require('https'); // Import Node's HTTP module
// const socketIo = require('socket.io'); // Import Socket.IO]
const  WebSocket  = require('ws');

const serverConfig = require('./config/serverConfig');
// const indexRouter = require('./routes/index.routes');
const apiRouter = require('./routes/api/api.routes');
// const websocketHandler = require('./sockets/websocketHandler');

const app = express();

const PORT_HTTP = process.env.PORT_HTTP ?? 3000;
const PORT_HTTPS = process.env.PORT_HTTPS ?? 3000;

// const sslOptions = {
//   key: fs.readFileSync(
//     path.join(
//       __dirname,
//       'public',
//       '.well-known',
//       'acme-challenge',
//       'privkey.pem'
//     )
//   ),
//   cert: fs.readFileSync(
//     path.join(
//       __dirname,
//       'public',
//       '.well-known',
//       'acme-challenge',
//       'fullchain.pem'
//     )
//   ),
// };

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

const wss = new WebSocket.Server({server});

const rooms = {};
// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('New WebSocket connection');
  // You can add more WebSocket event handling here
  ws.room = null
  ws.on("message", (message) =>{
    const messageStr = message.toString();
    console.log(`Received message: ${messageStr}`);

    // Parse incoming JSON message
    // let data;
    // try {
    //   data = JSON.parse(messageStr);
    // } catch (error) {
    //   console.log('Error parsing JSON:', error);
    //   return;
    // }

    // Handle different types of messages
     
      // Join a room
       
        rooms[data.room] = new Set();
 
      if (ws.room) {
        // Remove client from the previous room
        rooms[ws.room].delete(ws);
      }
      rooms[data.room].add(ws);
      ws.room = data.room;
      console.log(`Client joined room ${data.room}`);
   
      // Broadcast message to all clients in the room
      if (ws.room && rooms[ws.room]) {
        rooms[ws.room].forEach(client => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(messageStr);
          }
        });
        console.log(`Message sent to room ${ws.room}: ${messageStr}`);
   
    }
    
  })


});

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
