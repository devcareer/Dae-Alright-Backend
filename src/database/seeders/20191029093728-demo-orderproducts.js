'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const orderId = await queryInterface.rawSelect("Orders", {}, ['id']);
    const productId = await queryInterface.rawSelect("Products", {}, ['id']);
    if(!(orderId && productId)) throw new Error("nvalid 'vendorId' or 'categoryId'");

    return queryInterface.bulkInsert('OrderProducts', [
      { orderId: orderId, productId: productId, quantity: 4, createdAt: new Date(), updatedAt: new Date() },
      { orderId: orderId, productId: productId, quantity: 4, createdAt: new Date(), updatedAt: new Date() },
      { orderId: orderId, productId: productId, quantity: 4, createdAt: new Date(), updatedAt: new Date() },
      { orderId: orderId, productId: productId, quantity: 4, createdAt: new Date(), updatedAt: new Date() },
      { orderId: orderId, productId: productId, quantity: 4, createdAt: new Date(), updatedAt: new Date() },
      { orderId: orderId, productId: productId, quantity: 4, createdAt: new Date(), updatedAt: new Date() },
      { orderId: orderId, productId: productId, quantity: 4, createdAt: new Date(), updatedAt: new Date() },
      { orderId: orderId, productId: productId, quantity: 4, createdAt: new Date(), updatedAt: new Date() },
      { orderId: orderId, productId: productId, quantity: 4, createdAt: new Date(), updatedAt: new Date() },
      { orderId: orderId, productId: productId, quantity: 4, createdAt: new Date(), updatedAt: new Date() },
      { orderId: orderId, productId: productId, quantity: 4, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('OrderProducts', null, {});
  }
};
