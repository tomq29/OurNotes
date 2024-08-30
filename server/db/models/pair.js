'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pair extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { as: 'UserOne', foreignKey: 'userOneID' });
      this.belongsTo(models.User, { as: 'UserTwo', foreignKey: 'userTwoID' });

      // Associate pairs with shared notes and events
      this.hasMany(models.Note, { foreignKey: 'pairID' });
      this.hasMany(models.Event, { foreignKey: 'pairID' });
    }
  }
  Pair.init({
    userOneID: DataTypes.INTEGER,
    userTwoID: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pair',
  });
  return Pair;
};