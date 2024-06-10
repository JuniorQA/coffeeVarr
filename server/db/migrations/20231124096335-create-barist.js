/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Barists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      baristaFirstName: {
        type: Sequelize.TEXT,
      },
      baristaLastName: {
        type: Sequelize.TEXT,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      gender: {
        type: Sequelize.TEXT,
      },
      photo: {
        type: Sequelize.TEXT,
        defaultValue:
          'https://cdn4.iconfinder.com/data/icons/music-ui-solid-24px/24/user_account_profile-2-512.png',
      },
      experience: {
        type: Sequelize.FLOAT,
      },
      skills: {
        type: Sequelize.TEXT,
        defaultValue: '',
      },
      description: {
        type: Sequelize.TEXT,
        defaultValue: '',
      },
      rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
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
    await queryInterface.dropTable('Barists');
  },
};
