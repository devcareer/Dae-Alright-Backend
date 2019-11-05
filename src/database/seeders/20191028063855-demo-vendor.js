export default{
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Vendors', [{
    name: 'Tunde',
    email: 'demo@demo.com',
    password: '123456',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
