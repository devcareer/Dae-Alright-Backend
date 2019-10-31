const { Users, Vendors } = require('../models/index');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    function alterId(table){
      return queryInterface.changeColumn(table, 'id', {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true
      });
    }
    await alterId('Users');
    await alterId('Vendors');
    await alterId('Reviews');
    await alterId('Categories');
    await alterId('Products');
    await alterId('Orders');
    await alterId('Sales');
    try {
      await queryInterface.addColumn('OrderProducts', 'quantity', Sequelize.INTEGER);
      //return queryInterface.removeConstraint('OrderProducts', 'OrderProducts_pkey');
    } catch (error) {

    }
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Users', 'id', {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      allowNull: false,
      primaryKey: true
    });
  }
};
