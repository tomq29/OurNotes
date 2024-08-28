'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'tom@kiss',
          login: 'tom',
          password: await bcrypt.hash('123', 10),
          colorID: 1,
        },
        {
          email: 'marie@curie',
          login: 'marie',
          password: await bcrypt.hash('123', 10),
          colorID: 2,
        },
        {
          email: 'admin@admin',
          login: 'admin',
          password: await bcrypt.hash('123', 10),
          colorID: 3,
        },
        {
          email: 'igor@igor',
          login: 'igor',
          password: await bcrypt.hash('123', 10),
          colorID: 7,
        },
        {
          email: 'jane@doe',
          login: 'jane',
          password: await bcrypt.hash('123', 10),
          colorID: 4,
        },
        {
          email: 'john@smith',
          login: 'john',
          password: await bcrypt.hash('123', 10),
          colorID: 5,
        },
        {
          email: 'alice@wonderland',
          login: 'alice',
          password: await bcrypt.hash('123', 10),
          colorID: 6,
        },
    
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
