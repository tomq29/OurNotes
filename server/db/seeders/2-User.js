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
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
