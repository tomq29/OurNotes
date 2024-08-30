require('dotenv').config();
const express = require('express');
const path = require('path');
const http = require('http'); // Import Node's HTTP module

const serverConfig = require('./config/serverConfig');

const apiRouter = require('./routes/api/api.routes');

const PORT = process.env.PORT ?? 3000;

const app = express();

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
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server starter at ${PORT} port`);
});
