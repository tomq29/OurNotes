'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Color, { foreignKey: 'colorID' });

      this.hasMany(models.Folder, { foreignKey: 'userID' });

      this.hasMany(models.Note, { foreignKey: 'userID' });

      this.hasMany(models.Text, { foreignKey: 'userID' });

      this.hasMany(models.Pair, {
        foreignKey: 'userOneID',
        as: 'UserOnePairs',
      });
      this.hasMany(models.Pair, {
        foreignKey: 'userTwoID',
        as: 'UserTwoPairs',
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      login: DataTypes.STRING,
      password: DataTypes.STRING,
      colorID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
