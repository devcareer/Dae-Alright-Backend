/* eslint-disable no-unused-vars */
const uuidv4 = require('uuid/v4');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const vendorId = await queryInterface.rawSelect('Vendors', {}, ['id']);
    const customerId = await queryInterface.rawSelect('Users', {}, ['id']);
    if (!(vendorId && customerId)) throw new Error("Invalid 'vendorId' or 'customerId'");

    return queryInterface.bulkInsert('Orders',
      [
        {
          id: uuidv4(),
          vendorId,
          customerId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          vendorId,
          customerId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          vendorId,
          customerId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          vendorId,
          customerId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          vendorId,
          customerId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          vendorId,
          customerId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          vendorId,
          customerId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          vendorId,
          customerId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          vendorId,
          customerId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuidv4(),
          vendorId,
          customerId,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {});
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Orders', null, {})
};
