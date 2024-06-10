const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
      this.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' });
    }
  }
  Message.init(
    {
      senderId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      receiverId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      message: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Message',
    }
  );
  return Message;
};

