/* eslint-disable no-unused-vars */
import uuidv4 from 'uuid/v4';

export default {
  up: async (queryInterface, Sequelize) => {
    const orderId = await queryInterface.rawSelect('Orders', {}, ['id']);
    if (!orderId) throw new Error("Invalid 'orderId'");

    return queryInterface.bulkInsert(
      'Sales',
      [
        {
          id: uuidv4(),
          order_id: orderId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          order_id: orderId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          order_id: orderId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          order_id: orderId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          order_id: orderId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          order_id: orderId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          order_id: orderId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          order_id: orderId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          order_id: orderId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          order_id: orderId,
          created_at: new Date(),
          updated_at: new Date(),
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Sales', null, {})
};
