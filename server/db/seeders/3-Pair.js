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
          userOneID: 3, // admin
          userTwoID: 4, // Igor
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
