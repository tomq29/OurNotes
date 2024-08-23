'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Texts',
      [
        { body: 'This is the first text by user 1.', userID: 1, noteID: 1 },
        { body: 'This is the second text by user 2.', userID: 2, noteID: 2 },
        { body: 'This is the third text by user 3.', userID: 3, noteID: 3 },
        { body: 'Detailed project documentation by user 1.', userID: 1, noteID: 4 },
        { body: 'List of ingredients for pasta by user 2.', userID: 2, noteID: 5 },
        { body: 'Flight and hotel details for vacation by user 3.', userID: 3, noteID: 6 },
        { body: 'Monday: Upper body workout by user 1.', userID: 1, noteID: 7 },
        { body: 'Summary of "To Kill a Mockingbird" by user 2.', userID: 2, noteID: 8 },
        { body: 'Plan for managing expenses this month by user 3.', userID: 3, noteID: 9 },
        { body: 'Ideas for mobile app development by user 1.', userID: 1, noteID: 10 },
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
        // Pair-associated texts
        { body: 'Initial project discussion text.', userID: 1, noteID: 11 },
        { body: 'Follow-up on project tasks.', userID: 2, noteID: 11 },
        { body: 'Planning itinerary details.', userID: 2, noteID: 12 },
        { body: 'Suggestions for places to visit.', userID: 3, noteID: 12 },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Texts', null, {});
  },
};
