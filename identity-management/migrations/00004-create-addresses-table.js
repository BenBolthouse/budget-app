module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        onDelete: 'CASCADE',
        references: { model: 'Users', key: 'id' },
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(64),
      },
      lineOne: {
        type: Sequelize.STRING(128),
      },
      lineTwo: {
        type: Sequelize.STRING(128),
      },
      city: {
        type: Sequelize.STRING(64),
      },
      state: {
        type: Sequelize.STRING(2),
      },
      zip: {
        type: Sequelize.STRING(5),
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Addresses');
  },
};
