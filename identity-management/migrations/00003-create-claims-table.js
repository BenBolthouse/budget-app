module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('claims', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(64),
      },
      description: {
        allowNull: true,
        default: null,
        type: Sequelize.STRING(128),
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
    await queryInterface.dropTable('claims');
  },
};
