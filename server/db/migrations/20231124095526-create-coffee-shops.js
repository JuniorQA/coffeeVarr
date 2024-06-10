/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CoffeeShops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      shopName: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT,
        defaultValue: '',
      },
      photo: {
        type: Sequelize.TEXT,
        defaultValue:
          'https://e7.pngegg.com/pngimages/902/290/png-clipart-coffee-bean-latte-cafe-coffee-menu-point-text-poster.png',
      },
      city: {
        type: Sequelize.TEXT,
        defaultValue: 'Санкт-Петербург',
      },
      address: {
        type: Sequelize.TEXT,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      menu: {
        type: Sequelize.TEXT,
        defaultValue: '',
      },
      rating: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    await queryInterface.dropTable('CoffeeShops');
  },
};
