export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('OrderProduct', {
    product_id: {
      type: Sequelize.UUID,
      references: {
        model: 'Products',
        key: 'id',
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'NO ACTION',
      field: 'productId',
    },
    order_id: {
      type: Sequelize.UUID,
      references: {
        model: 'Orders',
        key: 'id',
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'NO ACTION',
      field: 'orderId',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: 'createdAt',
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: 'updatedAt',
    },
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('OrderProduct'),
};
