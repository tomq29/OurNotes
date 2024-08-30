const path = require('path');

const fs = require('fs');

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

module.exports = sslOptions;
