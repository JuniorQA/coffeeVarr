const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CoffeeShopRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Barist, CoffeeShop }) {
      this.belongsTo(Barist, { foreignKey: 'baristaId' });
      this.belongsTo(CoffeeShop, { foreignKey: 'coffeeShopId' });
    }
  }
  CoffeeShopRating.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
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
      rating: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'CoffeeShopRating',
    }
  );
  return CoffeeShopRating;
};
