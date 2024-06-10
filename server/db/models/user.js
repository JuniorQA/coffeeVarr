const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      CoffeeShopRating,
      CoffeeShopFavorite,
      BaristaRating,
      BaristaFavorite,
      CoffeeShop,
      IndividualUser,
      Barist,
      Message
    }) {
      this.hasMany(CoffeeShopRating, { foreignKey: 'userId' });
      this.hasMany(CoffeeShopFavorite, { foreignKey: 'userId' });
      this.hasMany(BaristaRating, { foreignKey: 'userId' });
      this.hasMany(BaristaFavorite, { foreignKey: 'userId' });
      this.hasMany(Message, { foreignKey: 'senderId', as: 'sentMessages' });
      this.hasMany(Message, {
        foreignKey: 'receiverId',
        as: 'receivedMessages',
      });
      this.hasOne(CoffeeShop, { foreignKey: 'userId' });
      this.hasOne(IndividualUser, { foreignKey: 'userId' });
      this.hasOne(Barist, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      role: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.TEXT,
      },
      password: {
        type: DataTypes.TEXT,
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
      modelName: 'User',
    }
  );
  return User;
};
