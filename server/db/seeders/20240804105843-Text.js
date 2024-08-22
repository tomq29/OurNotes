'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Texts', [
      { body: 'This is the first text by user 1.', userID: 1, noteID: 1 },
      { body: 'This is the second text by user 2.', userID: 2, noteID: 1 },
      { body: 'This is the third text by user 3.', userID: 3, noteID: 2 },
      { body: 'Detailed project documentation by user 1.', userID: 1, noteID: 3 },
      { body: 'List of ingredients for pasta by user 2.', userID: 2, noteID: 4 },
      { body: 'Flight and hotel details for vacation by user 3.', userID: 3, noteID: 5 },
      { body: 'Monday: Upper body workout by user 1.', userID: 1, noteID: 6 },
      { body: 'Summary of "To Kill a Mockingbird" by user 2.', userID: 2, noteID: 7 },
      { body: 'Plan for managing expenses this month by user 3.', userID: 3, noteID: 8 },
      { body: 'Ideas for mobile app development by user 1.', userID: 1, noteID: 9 },
      { body: 'Brainstorming session notes by user 2.', userID: 2, noteID: 10 },
      { body: 'Meeting minutes by user 3.', userID: 3, noteID: 1 },
      { body: 'Design mockups by user 1.', userID: 1, noteID: 2 },
      { body: 'Marketing strategy by user 2.', userID: 2, noteID: 3 },
      { body: 'Product launch plan by user 3.', userID: 3, noteID: 4 },
      { body: 'Weekly report by user 1.', userID: 1, noteID: 5 },
      { body: 'Client feedback by user 2.', userID: 2, noteID: 6 },
      { body: 'Task list by user 3.', userID: 3, noteID: 7 },
      { body: 'Sprint retrospective by user 1.', userID: 1, noteID: 8 },
      { body: 'Project roadmap by user 2.', userID: 2, noteID: 9 },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Texts', null, {});
  },
};
