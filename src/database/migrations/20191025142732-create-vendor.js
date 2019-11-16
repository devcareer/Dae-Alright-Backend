export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Vendors', {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.TEXT
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: 'updated_at'
    }
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Vendors')
};
