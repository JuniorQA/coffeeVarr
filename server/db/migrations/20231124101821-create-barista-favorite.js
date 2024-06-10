'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BaristaFavorites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      baristaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Barists',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      coffeeShopId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CoffeeShops',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BaristaFavorites');
  },
};
