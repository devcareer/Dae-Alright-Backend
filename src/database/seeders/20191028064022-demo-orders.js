/* eslint-disable no-unused-vars */
import uuidv4 from 'uuid/v4';

export default {
  up: async (queryInterface, Sequelize) => {
    const vendorId = await queryInterface.rawSelect('Vendors', {}, ['id']);
    const customerId = await queryInterface.rawSelect('Users', {}, ['id']);
    if (!(vendorId && customerId)) throw new Error("Invalid 'vendorId' or 'customerId'");

    return queryInterface.bulkInsert(
      'Orders',
      [
        {
          id: uuidv4(),
          vendor_id: vendorId,
          customer_id: customerId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          vendor_id: vendorId,
          customer_id: customerId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          vendor_id: vendorId,
          customer_id: customerId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          vendor_id: vendorId,
          customer_id: customerId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          vendor_id: vendorId,
          customer_id: customerId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          vendor_id: vendorId,
          customer_id: customerId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          vendor_id: vendorId,
          customer_id: customerId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          vendor_id: vendorId,
          customer_id: customerId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          vendor_id: vendorId,
          customer_id: customerId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          vendor_id: vendorId,
          customer_id: customerId,
          created_at: new Date(),
          updated_at: new Date(),
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Orders', null, {})
};
