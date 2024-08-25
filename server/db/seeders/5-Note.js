'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Notes',
      [
        { title: 'Meeting Notes', description: 'Notes from the team meeting', folderID: 1, userID: 1 },
        { title: 'Grocery List', description: 'List of groceries to buy', folderID: 2, userID: 2 },
        { title: 'Lecture Notes', description: 'Notes from the recent lecture', folderID: 3, userID: 3 },
        { title: 'Project Plan', description: 'Project planning details', folderID: 4, userID: 1 },
        { title: 'Pasta Recipe', description: 'Delicious pasta recipe', folderID: 5, userID: 2 },
        { title: 'Vacation Itinerary', description: 'Plans for upcoming vacation', folderID: 6, userID: 3 },
        { title: 'Workout Plan', description: 'Weekly workout schedule', folderID: 7, userID: 1 },
        { title: 'Book Review', description: 'Review of a recent book read', folderID: 8, userID: 2 },
        { title: 'Budget Plan', description: 'Monthly budget plan', folderID: 9, userID: 3 },
        { title: 'Brainstorming Ideas', description: 'Ideas for new projects', folderID: 10, userID: 1 },
        // Pair-associated notes
        { title: 'Project Collaboration', description: 'Discussing project details', folderID: 1, userID: 1, pairID: 1 },
        { title: 'Vacation Planning', description: 'Plan vacation with details', folderID: 2, userID: 2, pairID: 1 },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notes', null, {});
  },
};
