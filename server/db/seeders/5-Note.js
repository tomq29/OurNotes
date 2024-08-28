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

          content: JSON.stringify({
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Discuss project goals and timelines. Follow up with client next week.',
                  },
                ],
              },
            ],
          }),
        },
        {
          title: 'Grocery List',
          description: 'List of groceries to buy',
          folderID: 2,
          userID: 2,
          content: JSON.stringify({
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Milk, Eggs, Bread, Butter, Cheese, Apples.',
                  },
                ],
              },
            ],
          }),
        },
        {
          title: 'Lecture Notes',
          description: 'Notes from the recent lecture',
          folderID: 3,
          userID: 3,
          content: JSON.stringify({
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Key topics: React Hooks, State Management, and Component Lifecycle.',
                  },
                ],
              },
            ],
          }),
        },
        {
          title: 'Project Plan',
          description: 'Project planning details',
          folderID: 4,
          userID: 1,
          content: JSON.stringify({
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Define project scope, deliverables, and deadlines. Assign tasks to team members.',
                  },
                ],
              },
            ],
          }),
        },
        {
          title: 'Pasta Recipe',
          description: 'Delicious pasta recipe',
          folderID: 5,
          userID: 2,
          content: JSON.stringify({
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Ingredients: Pasta, Tomatoes, Olive Oil, Garlic, Basil, Parmesan.',
                  },
                ],
              },
            ],
          }),
        },
        {
          title: 'Vacation Itinerary',
          description: 'Plans for upcoming vacation',
          folderID: 6,
          userID: 3,
          content: JSON.stringify({
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Day 1: Beach, Day 2: Hiking, Day 3: City Tour.',
                  },
                ],
              },
            ],
          }),
        },
        {
          title: 'Workout Plan',
          description: 'Weekly workout schedule',
          folderID: 7,
          userID: 1,
          content: JSON.stringify({
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Monday: Cardio, Wednesday: Strength, Friday: Yoga.',
                  },
                ],
              },
            ],
          }),
        },
        {
          title: 'Book Review',
          description: 'Review of a recent book read',
          folderID: 8,
          userID: 2,
          content: JSON.stringify({
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'The book provides a deep insight into human psychology and behavior.',
                  },
                ],
              },
            ],
          }),
        },
        {
          title: 'Budget Plan',
          description: 'Monthly budget plan',
          folderID: 9,
          userID: 3,
          content: JSON.stringify({
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Allocate 50% for essentials, 30% for savings, 20% for entertainment.',
                  },
                ],
              },
            ],
          }),
        },
        {
          title: 'Brainstorming Ideas',
          description: 'Ideas for new projects',
          folderID: 10,
          userID: 1,
          content: JSON.stringify({
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Develop a new app for productivity, explore AI in automation.',
                  },
                ],
              },
            ],
          }),
        },
        // Collaborative notes (with pairID)
        {
          title: 'Project Collaboration',
          description: 'Discussing project details',
          folderID: 1,
          userID: 1,
          pairID: 1,
          content: JSON.stringify({
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Let’s outline the project tasks. Need to sync with the design team.',
                  },
                  {
                    type: 'text',
                    text: ' I will draft the initial proposal and share it by the end of the day.',
                  },
                ],
              },
            ],
          }),
        },
        {
          title: 'Vacation Planning',
          description: 'Plan vacation with details',
          folderID: 2,
          userID: 2,
          pairID: 1,
          content: JSON.stringify({
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Book flights by the end of the week. Check out Airbnb options.',
                  },
                  {
                    type: 'text',
                    text: ' I’ll look into rental cars and local attractions.',
                  },
                ],
              },
            ],
          }),
        },
        {
          title: 'Marketing Strategy',
          description: 'Developing the marketing strategy for the new product.',
          folderID: 3,
          userID: 1,
          pairID: 1,
          content: JSON.stringify({
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'We need to focus on social media campaigns and influencer partnerships.',
                  },
                  {
                    type: 'text',
                    text: ' I agree, and we should also look into email marketing and SEO optimization.',
                  },
                ],
              },
            ],
          }),
        },
        {
          title: 'App Development',
          description: 'Discuss features for the new mobile app.',
          folderID: 4,
          userID: 2,
          pairID: 1,
          content: JSON.stringify({
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'The app should have offline functionality and a clean user interface.',
                  },
                  {
                    type: 'text',
                    text: ' Let’s also include push notifications for updates and alerts.',
                  },
                ],
              },
            ],
          }),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notes', null, {});
  },
};
