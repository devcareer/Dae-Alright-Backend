export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    first_name: 'Tunde',
    last_name: 'Doe',
    email: 'demo@demo.com',
    password: '123456',
    created_at: new Date(),
    updated_at: new Date()
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
