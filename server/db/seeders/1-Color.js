'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Colors',
      [
        { color: '#D3D3D3', title: 'Светло-серый' }, // Light Grey
        { color: '#FFCCCC', title: 'Светло-красный' }, // Light Red
        { color: '#CCFFCC', title: 'Светло-зеленый' }, // Light Green
        { color: '#CCCCFF', title: 'Светло-синий' }, // Light Blue
        { color: '#FFFACD', title: 'Лимонный' }, // Lemon Chiffon
        { color: '#FFD700', title: 'Золотой' }, // Gold
        { color: '#FF69B4', title: 'Ярко-розовый' }, // Hot Pink
        { color: '#FFB6C1', title: 'Светло-розовый' }, // Light Pink
        { color: '#E6E6FA', title: 'Лаванда' }, // Lavender
        { color: '#B0E0E6', title: 'Пудровый синий' }, // Powder Blue
        { color: '#F0E68C', title: 'Хаки' }, // Khaki
        { color: '#FFE4B5', title: 'Мокасин' }, // Moccasin
        { color: '#D8BFD8', title: 'Тис' }, // Thistle
        { color: '#C0C0C0', title: 'Серебряный' }, // Silver
        { color: '#87CEEB', title: 'Небесно-голубой' }, // Sky Blue
        { color: '#FFDAB9', title: 'Персиковый' }, // Peach Puff
        { color: '#FAFAD2', title: 'Светло-золотистый' }, // Light Goldenrod Yellow
        { color: '#FFEFD5', title: 'Папайя' }, // Papaya Whip
        { color: '#FFE4E1', title: 'Туманный розовый' }, // Misty Rose
        { color: '#F5DEB3', title: 'Пшеница' }, // Wheat
        { color: '#FFF5EE', title: 'Ракушка' }, // Seashell
        { color: '#F0FFF0', title: 'Медовая роса' }, // Honeydew
        { color: '#FAEBD7', title: 'Антикварный белый' }, // Antique White
        { color: '#FDF5E6', title: 'Старое кружево' }, // Old Lace
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Colors', null, {});
  },
};
