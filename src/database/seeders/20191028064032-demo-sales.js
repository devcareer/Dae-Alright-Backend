module.exports = {
  up: async (queryInterface, Sequelize) => {
    const orderId = await queryInterface.rawSelect('Orders', {}, ['id']);
    if(!orderId) throw new Error("Invalid 'orderId'");

      return queryInterface.bulkInsert('Sales', [
        { date: new Date(), orderId: orderId, createdAt: new Date(), updatedAt: new Date() },
        { date: new Date(), orderId: orderId, createdAt: new Date(), updatedAt: new Date() },
        { date: new Date(), orderId: orderId, createdAt: new Date(), updatedAt: new Date() },
        { date: new Date(), orderId: orderId, createdAt: new Date(), updatedAt: new Date() },
        { date: new Date(), orderId: orderId, createdAt: new Date(), updatedAt: new Date() },
        { date: new Date(), orderId: orderId, createdAt: new Date(), updatedAt: new Date() },
        { date: new Date(), orderId: orderId, createdAt: new Date(), updatedAt: new Date() },
        { date: new Date(), orderId: orderId, createdAt: new Date(), updatedAt: new Date() },
        { date: new Date(), orderId: orderId, createdAt: new Date(), updatedAt: new Date() },
        { date: new Date(), orderId: orderId, createdAt: new Date(), updatedAt: new Date() }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Sales', null, {});
  }
};
