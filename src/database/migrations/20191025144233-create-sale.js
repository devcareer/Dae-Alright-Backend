export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Sales', {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()')
    },
    date: {
      type: Sequelize.DATE
    },
    orderId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: 'Orders',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      field: 'order_id',
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
    }
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Sales')
};
