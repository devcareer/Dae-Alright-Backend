export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Vendors', [{
    name: 'Tunde',
    email: 'demo@demo.com',
    password: '123456',
    created_at: new Date(),
    updated_at: new Date()
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
