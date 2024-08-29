#!/bin/sh

# Start the WebSocket server in the background
npx y-websocket-server --port 1234 &

# Start your Node.js app
node app.js