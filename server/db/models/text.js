'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Text extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Note, { foreignKey: 'noteID' });
    
      this.belongsTo(models.User,{ foreignKey: 'userID' } )
    }

  }
  Text.init(
    {
      body: DataTypes.TEXT,
      userID: DataTypes.INTEGER,
      noteID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Text',
    }
  );
  return Text;
};
