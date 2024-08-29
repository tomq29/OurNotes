'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Pair, { foreignKey: 'pairID' });
      this.belongsTo(models.EventType, { foreignKey: 'eventTypeID' });
    }
  }
  Event.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      allDay: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      pairID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      eventTypeID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },

    {
      sequelize,
      modelName: 'Event',
      validate: {
        isEndAfterStart() {
          if (this.end <= this.start) {
            throw new Error('Дата окончания не может быть раньше даты начала');
          }
        },
      },
    }
  );
  return Event;
};
