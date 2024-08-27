'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Color, { foreignKey: 'colorID' });
    }
  }
  EventType.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      colorID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },

    {
      sequelize,
      modelName: 'EventType',
    }
  );
  return EventType;
};
