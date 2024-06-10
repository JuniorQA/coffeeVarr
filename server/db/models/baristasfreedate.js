const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BaristasFreeDate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  BaristasFreeDate.init(
    {
      freeDateId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'FreeDates',
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
      modelName: 'BaristasFreeDate',
    }
  );
  return BaristasFreeDate;
};
