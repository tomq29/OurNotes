'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Colors', [
      { color: '#FFCCCC' },  // Light Red
      { color: '#CCFFCC' },  // Light Green
      { color: '#CCCCFF' },  // Light Blue
      { color: '#FFFACD' },  // Lemon Chiffon
      { color: '#FFD700' },  // Gold
      { color: '#FF69B4' },  // Hot Pink
      { color: '#FFB6C1' },  // Light Pink
      { color: '#E6E6FA' },  // Lavender
      { color: '#B0E0E6' },  // Powder Blue
      { color: '#F0E68C' },  // Khaki
      { color: '#FFE4B5' },  // Moccasin
      { color: '#D8BFD8' },  // Thistle
      { color: '#D3D3D3' },  // Light Grey
      { color: '#C0C0C0' },  // Silver
      { color: '#87CEEB' },  // Sky Blue
      { color: '#FFDAB9' },  // Peach Puff
      { color: '#FAFAD2' },  // Light Goldenrod Yellow
      { color: '#FFEFD5' },  // Papaya Whip
      { color: '#FFE4E1' },  // Misty Rose
      { color: '#F5DEB3' },  // Wheat
      { color: '#FFF5EE' },  // Seashell
      { color: '#F0FFF0' },  // Honeydew
      { color: '#FAEBD7' },  // Antique White
      { color: '#FDF5E6' },  // Old Lace
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Colors', null, {});
  },
};
