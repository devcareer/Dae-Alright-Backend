module.exports = {
  up: async (queryInterface, Sequelize) => {
    const vendorId = await queryInterface.rawSelect("Vendors", {}, ['id']);
    const customerId = await queryInterface.rawSelect("Users", {}, ['id']);
    if(!(vendorId && customerId)) throw new Error("Invalid 'vendorId' or 'customerId'");

      return queryInterface.bulkInsert('Orders', [
        { vendorId: vendorId, customerId: customerId, createdAt: new Date(), updatedAt: new Date()},
        { vendorId: vendorId, customerId: customerId, createdAt: new Date(), updatedAt: new Date()},
        { vendorId: vendorId, customerId: customerId, createdAt: new Date(), updatedAt: new Date()},
        { vendorId: vendorId, customerId: customerId, createdAt: new Date(), updatedAt: new Date()},
        { vendorId: vendorId, customerId: customerId, createdAt: new Date(), updatedAt: new Date()},
        { vendorId: vendorId, customerId: customerId, createdAt: new Date(), updatedAt: new Date()},
        { vendorId: vendorId, customerId: customerId, createdAt: new Date(), updatedAt: new Date()},
        { vendorId: vendorId, customerId: customerId, createdAt: new Date(), updatedAt: new Date()},
        { vendorId: vendorId, customerId: customerId, createdAt: new Date(), updatedAt: new Date()},
        { vendorId: vendorId, customerId: customerId, createdAt: new Date(), updatedAt: new Date()}
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Orders', null, {});
  }
};
