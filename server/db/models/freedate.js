const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FreeDate extends Model {
    static associate({ Barist }) {
      this.belongsToMany(Barist, {
        through: 'BaristasFreeDates',
        as: 'BaristaFreeDates',
        foreignKey: 'freeDateId',
        otherKey: 'baristaId',
      });
    }
  }
  FreeDate.init(
    {
      Date: {
        type: DataTypes.DATE,
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
      modelName: 'FreeDate',
    }
  );
  return FreeDate;
};
