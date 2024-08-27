'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    await queryInterface.bulkInsert(
      'Events',
      [
        {
          title: 'Meeting Today',
          description: 'Notes from the team meeting today',
          pairID: 1,
          eventTypeID: 1,
          start: today, // Сегодня
          end: new Date(today.getTime() + 60 * 60 * 1000), // Через 1 час
        },
        {
          title: 'Workshop Tomorrow',
          description: 'Workshop on project development',
          pairID: 1,
          eventTypeID: 1,
          start: tomorrow, // Завтра
          end: new Date(tomorrow.getTime() + 2 * 60 * 60 * 1000), // Завтра через 2 часа
        },
        {
          title: 'Conference Tomorrow',
          description: 'Annual conference on technology trends',
          pairID: 1,
          eventTypeID: 1,
          start: tomorrow, // Завтра
          end: new Date(tomorrow.getTime() + 3 * 60 * 60 * 1000), // Завтра через 3 часа
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', null, {});
  },
};
