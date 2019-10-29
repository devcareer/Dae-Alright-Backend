module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Products', {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()')
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.TEXT
    },
    imageUrl: {
      type: Sequelize.STRING
    },
    vendorId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: 'Vendors',
        key: 'id',
      },
      onUpdate: 'CASCADE'
    },
    categoryId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: 'Categories',
        key: 'id',
      },
      onUpdate: 'CASCADE'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Products')
};
