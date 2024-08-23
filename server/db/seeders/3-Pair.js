'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Pairs',
      [
        {
          userOneID: 1, // Tom
          userTwoID: 2, // Marie
          status: 'active',
        },
        {
          userOneID: 2, // Marie
          userTwoID: 3, // Admin
          status: 'active',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pairs', null, {});
  },
};