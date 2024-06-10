const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Barist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      User,
      CoffeeShop,
      BaristaRating,
      FreeDate,
      // CoffeeShopFavorite,
      // BaristasFreeDate,
    }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsToMany(CoffeeShop, {
        through: 'CoffeeShopFavorites',
        as: 'CoffeeShopFavorited',
        foreignKey: 'baristaId',
        otherKey: 'coffeeShopId',
      });

      this.hasMany(BaristaRating, { foreignKey: 'baristaId' });
      // this.hasMany(CoffeeShopFavorite, { foreignKey: 'baristaId' });
      // this.hasMany(BaristasFreeDate, { foreignKey: 'baristaId' });
      this.belongsToMany(FreeDate, {
        // через какую таблицу
        through: 'BaristasFreeDates',
        as: 'FreeDateBaristas',
        // какой внешний ключ для текущей модели
        foreignKey: 'baristaId',
        // какой внешний ключ для связанной модели
        otherKey: 'freeDateId',
      });
    }
  }
  Barist.init(
    {
      baristaFirstName: {
        type: DataTypes.TEXT,
      },
      baristaLastName: {
        type: DataTypes.TEXT,
      },
      age: {
        type: DataTypes.INTEGER,
      },
      gender: {
        type: DataTypes.TEXT,
      },
      photo: {
        type: DataTypes.TEXT,
        defaultValue:
          'https://cdn4.iconfinder.com/data/icons/music-ui-solid-24px/24/user_account_profile-2-512.png',
      },
      experience: {
        type: DataTypes.FLOAT,
      },
      skills: {
        type: DataTypes.TEXT,
        defaultValue: '',
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: '',
      },
      rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
      },
    },
    {
      sequelize,
      modelName: 'Barist',
    }
  );
  return Barist;
};
