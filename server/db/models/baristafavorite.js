'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BaristaFavorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  BaristaFavorite.init({
    baristaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Barists',
        key: 'id',
      },
      onDelete: 'cascade',
    },
    coffeeShopId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'CoffeeShops',
        key: 'id',
      },
      onDelete: 'cascade',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'BaristaFavorite',
  });
  return BaristaFavorite;
};