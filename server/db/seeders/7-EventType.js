'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'EventTypes',
      [
        {
          title: 'Встреча',
          colorID: 4,
        },
        {
          title: 'Мероприятие',
          colorID: 6,
        },
        {
          title: 'Дела',
          colorID: 10,
        },
        {
          title: 'День Рождения',
          colorID: 8,
        },
        {
          title: 'Спорт',
          colorID: 9,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EventTypes', null, {});
  },
};
