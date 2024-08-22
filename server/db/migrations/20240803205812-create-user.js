'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      login: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      colorID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Colors',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        defaultValue: Sequelize.fn('NOW'),
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        defaultValue: Sequelize.fn('NOW'),
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
