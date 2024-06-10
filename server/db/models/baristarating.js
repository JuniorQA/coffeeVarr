const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BaristaRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Barist, User }) {
      this.belongsTo(Barist, { foreignKey: 'baristaId' });
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  BaristaRating.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      baristaId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Barists',
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
      modelName: 'BaristaRating',
    }
  );
  return BaristaRating;
};
