const express = require('express');
const cookieParser = require('cookie-parser');

function serverConfig(app) {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.disable('x-powered-by');
  app.use(cookieParser());
  app.use(express.static('public'));
}

module.exports = serverConfig;
