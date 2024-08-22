'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Folder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'userID' });
      this.hasMany(models.Note, { foreignKey: 'folderID' });
    }
  }
  Folder.init(
    {
      name: DataTypes.STRING,
      purpose: DataTypes.STRING,
      userID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Folder',
    }
  );
  return Folder;
};
