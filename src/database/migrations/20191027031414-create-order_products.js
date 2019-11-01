module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'OrderProducts',
    {
      productId: {
        type: Sequelize.UUID,
        references: {
          model: 'Products',
          key: 'id'
        },
        allowNull: false,
        primaryKey: true,
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
        primaryKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'

      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    }
  ),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('OrderProducts'),
};
