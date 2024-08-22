'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Folder, { foreignKey: 'folderID' });
      this.belongsTo(models.Folder, { foreignKey: 'userID' });
      this.hasMany(models.Text, { foreignKey: 'noteID' });
 
    }
  }
  Note.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      folderID: DataTypes.INTEGER,
    },

    {
      sequelize,
      modelName: 'Note',
    }
  );
  return Note;
};
