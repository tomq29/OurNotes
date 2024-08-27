// seeds/XXXXXX-notes.js

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Notes',
      [
        // Personal notes (no pairID)
        {
          title: 'Meeting Notes',
          description: 'Notes from the team meeting',
          folderID: 1,
          userID: 1,
          content: [
            {
              insert:
                'Discuss project goals and timelines. Follow up with client next week.',
              attributes: {
                userId: 1,
                colorId: '#FFCCCC',
              },
            },
          ],
        },
        {
          title: 'Grocery List',
          description: 'List of groceries to buy',
          folderID: 2,
          userID: 2,
          content: [
            {
              insert: 'Milk, Eggs, Bread, Butter, Cheese, Apples.',
              attributes: {
                userId: 2,
                colorId: '#CCFFCC',
              },
            },
          ],
        },
        {
          title: 'Lecture Notes',
          description: 'Notes from the recent lecture',
          folderID: 3,
          userID: 3,
          content: [
            {
              insert:
                'Key topics: React Hooks, State Management, and Component Lifecycle.',
              attributes: {
                userId: 3,
                colorId: '#CCCCFF',
              },
            },
          ],
        },
        {
          title: 'Project Plan',
          description: 'Project planning details',
          folderID: 4,
          userID: 1,
          content: [
            {
              insert:
                'Define project scope, deliverables, and deadlines. Assign tasks to team members.',
              attributes: {
                userId: 1,
                colorId: '#FFCCCC',
              },
            },
          ],
        },
        {
          title: 'Pasta Recipe',
          description: 'Delicious pasta recipe',
          folderID: 5,
          userID: 2,
          content: [
            {
              insert:
                'Ingredients: Pasta, Tomatoes, Olive Oil, Garlic, Basil, Parmesan.',
              attributes: {
                userId: 2,
                colorId: '#CCFFCC',
              },
            },
          ],
        },
        {
          title: 'Vacation Itinerary',
          description: 'Plans for upcoming vacation',
          folderID: 6,
          userID: 3,
          content: [
            {
              insert: 'Day 1: Beach, Day 2: Hiking, Day 3: City Tour.',
              attributes: {
                userId: 3,
                colorId: '#CCCCFF',
              },
            },
          ],
        },
        {
          title: 'Workout Plan',
          description: 'Weekly workout schedule',
          folderID: 7,
          userID: 1,
          content: [
            {
              insert: 'Monday: Cardio, Wednesday: Strength, Friday: Yoga.',
              attributes: {
                userId: 1,
                colorId: '#FFCCCC',
              },
            },
          ],
        },
        {
          title: 'Book Review',
          description: 'Review of a recent book read',
          folderID: 8,
          userID: 2,
          content: [
            {
              insert:
                'The book provides a deep insight into human psychology and behavior.',
              attributes: {
                userId: 2,
                colorId: '#CCFFCC',
              },
            },
          ],
        },
        {
          title: 'Budget Plan',
          description: 'Monthly budget plan',
          folderID: 9,
          userID: 3,
          content: [
            {
              insert:
                'Allocate 50% for essentials, 30% for savings, 20% for entertainment.',
              attributes: {
                userId: 3,
                colorId: '#CCCCFF',
              },
            },
          ],
        },
        {
          title: 'Brainstorming Ideas',
          description: 'Ideas for new projects',
          folderID: 10,
          userID: 1,
          content: [
            {
              insert:
                'Develop a new app for productivity, explore AI in automation.',
              attributes: {
                userId: 1,
                colorId: '#FFCCCC',
              },
            },
          ],
        },
        // Collaborative notes (with pairID)
        {
          title: 'Project Collaboration',
          description: 'Discussing project details',
          folderID: 1,
          userID: 1,
          pairID: 1,
          content: [
            {
              insert:
                'Let’s outline the project tasks. Need to sync with the design team.',
              attributes: {
                userId: 1,
                colorId: '#FFCCCC',
              },
            },
            {
              insert:
                'I will draft the initial proposal and share it by the end of the day.',
              attributes: {
                userId: 2,
                colorId: '#CCFFCC',
              },
            },
          ],
        },
        {
          title: 'Vacation Planning',
          description: 'Plan vacation with details',
          folderID: 2,
          userID: 2,
          pairID: 1,
          content: [
            {
              insert:
                'Book flights by the end of the week. Check out Airbnb options.',
              attributes: {
                userId: 2,
                colorId: '#CCFFCC',
              },
            },
            {
              insert: 'I’ll look into rental cars and local attractions.',
              attributes: {
                userId: 1,
                colorId: '#FFCCCC',
              },
            },
          ],
        },
        {
          title: 'Marketing Strategy',
          description: 'Developing the marketing strategy for the new product.',
          folderID: 3,
          userID: 1,
          pairID: 1,
          content: [
            {
              insert:
                'We need to focus on social media campaigns and influencer partnerships.',
              attributes: {
                userId: 1,
                colorId: '#FFCCCC',
              },
            },
            {
              insert:
                'I agree, and we should also look into email marketing and SEO optimization.',
              attributes: {
                userId: 2,
                colorId: '#CCFFCC',
              },
            },
          ],
        },
        {
          title: 'App Development',
          description: 'Discuss features for the new mobile app.',
          folderID: 4,
          userID: 2,
          pairID: 1,
          content: [
            {
              insert:
                'The app should have offline functionality and a clean user interface.',
              attributes: {
                userId: 2,
                colorId: '#CCFFCC',
              },
            },
            {
              insert:
                'Let’s also include push notifications for updates and alerts.',
              attributes: {
                userId: 1,
                colorId: '#FFCCCC',
              },
            },
          ],
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notes', null, {});
  },
};
