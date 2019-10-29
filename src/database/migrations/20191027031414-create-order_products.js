module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'OrderProducts',
    {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      productId: {
        type: Sequelize.UUID,
        references: {
          model: 'Products',
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      orderId: {
        type: Sequelize.UUID,
        references: {
          model: 'Orders',
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: false
      }
    }
  ),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('OrderProducts'),
};
