'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const orderId = await queryInterface.rawSelect("Orders", {}, ['id']);
    const productId = await queryInterface.rawSelect("Products", {}, ['id']);
    if(!(orderId && productId)) throw new Error("Invalid 'orderId' or 'productId'");

    return queryInterface.bulkInsert('OrderProducts',
      [
        {
          orderId,
          productId,
          quantity: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          orderId,
          productId,
          quantity: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          orderId,
          productId,
          quantity: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          orderId,
          productId,
          quantity: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          orderId,
          productId,
          quantity: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          orderId,
          productId,
          quantity: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          orderId,
          productId,
          quantity: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          orderId,
          productId,
          quantity: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          orderId,
          productId,
          quantity: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          orderId,
          productId,
          quantity: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          orderId,
          productId,
          quantity: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
      );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('OrderProducts', null, {});
  }
};
