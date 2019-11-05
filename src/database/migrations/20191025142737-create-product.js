export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Products', {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()')
    },
    name: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.INTEGER
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.TEXT
    },
    image_url: {
      type: Sequelize.STRING
    },
    vendor_id: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: 'Vendors',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      field: 'vendor_id',
    },
    category_id: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: 'Categories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      field: 'category_id',
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    }
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Products')
};
