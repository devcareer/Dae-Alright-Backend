module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userId = await queryInterface.rawSelect("Users", {}, ['id']);
    const vendorId = await queryInterface.rawSelect("Vendors", {}, ['id']);
    if(!(userId && vendorId)) throw new Error("nvalid 'userId' or 'vendorId'");

    return queryInterface.bulkInsert('Reviews', [
      {ratings: 0, title: "pretium iaculis diam erat fermentum", content: "fusce posuere felis sed lacus morbi sem mauris laoreet", userId, vendorId: vendorId, createdAt: new Date(), updatedAt: new Date()},
      {ratings: 4, title: "fusce congue diam", content: "fusce congue diam id", userId, vendorId: vendorId, createdAt: new Date(), updatedAt: new Date()},
      {ratings: 4, title: "cursus vestibulum proin", content: "luctus tincidunt nulla mollis molestie lorem quisque ut", userId, vendorId: vendorId, createdAt: new Date(), updatedAt: new Date()},
      {ratings: 0, title: "nisi volutpat eleifend donec ut", content: "nulla suspendisse potenti cras in purus", userId, vendorId: vendorId, createdAt: new Date(), updatedAt: new Date()},
      {ratings: 0, title: "suspendisse potenti", content: "mauris viverra diam", userId, vendorId: vendorId, createdAt: new Date(), updatedAt: new Date()},
      {ratings: 5, title: "felis", content: "erat curabitur gravida nisi at nibh", userId, vendorId: vendorId, createdAt: new Date(), updatedAt: new Date()},
      {ratings: 3, title: "in est risus", content: "tincidunt eu felis fusce posuere felis sed lacus", userId, vendorId: vendorId, createdAt: new Date(), updatedAt: new Date()},
      {ratings: 1, title: "duis ac nibh fusce lacus", content: "semper porta volutpat", userId, vendorId: vendorId, createdAt: new Date(), updatedAt: new Date()},
      {ratings: 3, title: "nunc viverra dapibus", content: "lacus purus", userId, vendorId: vendorId, createdAt: new Date(), updatedAt: new Date()},
      {ratings: 5, title: "eros", content: "sit amet sapien dignissim", userId, vendorId: vendorId, createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Reviews', null, {});
  }
};
