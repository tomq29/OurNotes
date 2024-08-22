'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Colors', [
      { color: '#FFCCCC' },
      { color: '#CCFFCC' },
      { color: '#CCCCFF' },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Colors', null, {});
  },
};
