export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Products', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()')
    },
    name: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.FLOAT
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.TEXT
    },
    imageUrl: {
      type: Sequelize.STRING,
      field: 'image_url'
    },
    vendorId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: 'Vendors',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'NO ACTION',
      field: 'vendor_id',
    },
    categoryId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: 'Categories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'NO ACTION',
      field: 'category_id',
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Products')
};
