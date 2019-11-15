export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Orders', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    customerId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'NO ACTION',
      field: 'customer_id',
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Orders')
};
