'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IndividualUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  IndividualUser.init(
    {
      firstName: {
        type: DataTypes.TEXT,
      },
      lastName: {
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
      photo: {
        type: DataTypes.TEXT,
        defaultValue:
          'https://cdn4.iconfinder.com/data/icons/music-ui-solid-24px/24/user_account_profile-2-512.png',
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
      modelName: 'IndividualUser',
    }
  );
  return IndividualUser;
};
