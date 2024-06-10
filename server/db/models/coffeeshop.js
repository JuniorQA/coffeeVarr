const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CoffeeShop extends Model {
    static associate({ User, Barist, CoffeeShopRating }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsToMany(Barist, {
        // через какую таблицу
        through: 'CoffeeShopFavorites',
        as: 'FavoriteBaristas',
        // какой внешний ключ для текущей модели
        foreignKey: 'coffeeShopId',
        // какой внешний ключ для связанной модели
        otherKey: 'baristaId',
      });
      this.hasMany(CoffeeShopRating, { foreignKey: 'coffeeShopId' });
    }
  }
  CoffeeShop.init(
    {
      shopName: {
        type: DataTypes.TEXT,
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: '',
      },
      photo: {
        type: DataTypes.TEXT,
        defaultValue:
          'https://e7.pngegg.com/pngimages/902/290/png-clipart-coffee-bean-latte-cafe-coffee-menu-point-text-poster.png',
      },
      city: {
        type: DataTypes.TEXT,
        defaultValue: 'Санкт-Петербург',
      },
      address: {
        type: DataTypes.TEXT,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      menu: {
        type: DataTypes.TEXT,
        defaultValue: '',
      },
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
      modelName: 'CoffeeShop',
    }
  );
  return CoffeeShop;
};
