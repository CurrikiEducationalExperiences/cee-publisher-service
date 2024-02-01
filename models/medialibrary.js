'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MediaLibrary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here      
      MediaLibrary.belongsTo(models.MediaOwner,{
        as:'MediaOwner',
        foreignKey: 'mediaOwnerId',
        targetKey: 'id'
      });
    }
  }
  MediaLibrary.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: DataTypes.STRING,
    mediaOwnerId: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.STRING,
    resource: DataTypes.STRING,
    parentId: DataTypes.STRING,
    identifierType: DataTypes.STRING,
    identifier: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    collection: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MediaLibrary',
    freezeTableName: true
  });
  return MediaLibrary;
};