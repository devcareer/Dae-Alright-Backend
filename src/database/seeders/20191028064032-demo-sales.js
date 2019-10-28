/* eslint-disable no-unused-vars */
const uuidv4 = require('uuid/v4');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const orderId = await queryInterface.rawSelect('Orders', {}, ['id']);
    if (!orderId) throw new Error("Invalid 'orderId'");

    return queryInterface.bulkInsert('Sales',
      [
        {
          id: uuidv4(),
          orderId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          orderId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          orderId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          orderId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          orderId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          orderId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          orderId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          orderId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          orderId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          orderId,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {});
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Sales', null, {})
};
