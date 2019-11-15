/* eslint-disable no-unused-vars */
import uuidv4 from 'uuid/v4';

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Categories',
    [
      {
        id: uuidv4(),
        name: 'Calypso - Strawberry Lemonade',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Onions - Vidalia',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Anchovy In Oil',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Pasta - Fusili, Dry',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Bread - Rye',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Cranberries - Fresh',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Cod - Fillets',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Tart Shells - Savory',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Beer - Original Organic Lager',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Tart - Butter Plain Squares',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Categories', null, {})
};
