export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('OrderProducts', {
    productId: {
      type: Sequelize.UUID,
      primaryKey: true,
      references: {
        model: 'Products',
        key: 'id',
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'NO ACTION',
      field: 'product_id',
    },
    orderId: {
      type: Sequelize.UUID,
      primaryKey: true,
      references: {
        model: 'Orders',
        key: 'id',
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'NO ACTION',
      field: 'order_id',
    },
    quantity: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: 'created_at',
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: 'updated_at',
    },
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('OrderProducts'),
};
