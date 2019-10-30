module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Categories',
        [
          {
            name: "Calypso - Strawberry Lemonade",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: "Onions - Vidalia",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: "Anchovy In Oil",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: "Pasta - Fusili, Dry",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: "Bread - Rye",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: "Cranberries - Fresh",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: "Cod - Fillets",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: "Tart Shells - Savory",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: "Beer - Original Organic Lager",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: "Tart - Butter Plain Squares",
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        {}
        );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Categories', null, {});
  }
};
