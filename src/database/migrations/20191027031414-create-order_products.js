export default{
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'OrderProduct',
    {
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
      product_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Products',
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
        field: 'product_id',
      },
      order_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Orders',
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
        field: 'order_id',
      }
    }
  ),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('OrderProduct'),
};
