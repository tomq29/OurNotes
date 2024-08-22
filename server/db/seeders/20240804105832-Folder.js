'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Folders', [
      { name: 'General', purpose: 'notes', userID: 1 },
      { name: 'Personal', purpose: 'notes', userID: 2 },
      { name: 'Study', purpose: 'notes', userID: 3 },
      { name: 'Projects', purpose: 'notes', userID: 1 },
      { name: 'Recipes', purpose: 'notes', userID: 2 },
      { name: 'Travel', purpose: 'notes', userID: 3 },
      { name: 'Fitness', purpose: 'notes', userID: 1 },
      { name: 'Books', purpose: 'notes', userID: 2 },
      { name: 'Finance', purpose: 'notes', userID: 3 },
      { name: 'Ideas', purpose: 'notes', userID: 1 },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Folders', null, {});
  },
};
