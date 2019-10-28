module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Vendors', [{
        name: 'Tunde',
        email: 'demo@demo.com',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
