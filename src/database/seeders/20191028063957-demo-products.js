module.exports = {
  up: async (queryInterface, Sequelize) => {
      const vendorId = await queryInterface.rawSelect("Vendors", {}, ['id']);
      const categoryId = await queryInterface.rawSelect("Categories", {}, ['id']);
      if(!(vendorId && categoryId)) throw new Error("nvalid 'vendorId' or 'categoryId'");

      return queryInterface.bulkInsert('Products', [
        { name: "Soup - Knorr, Chicken Gumbo", price: 854.2, quantity: 26, description: "Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",image_url: "http://dummyimage.com/237x164.jpg/dddddd/000000", vendorId: vendorId, categoryId: categoryId, createdAt: new Date(), updatedAt: new Date()},
        { name: "Pineapple - Golden", price: 609.17, quantity: 2, description: "Integer ac leo.",image_url: "http://dummyimage.com/173x164.jpg/ff4444/ffffff", vendorId: vendorId, categoryId: categoryId, createdAt: new Date(), updatedAt: new Date()},
        { name: "Shrimp - 31/40", price: 394.97, quantity: 53, description: "Aenean fermentum. Donec ut mauris eget massa tempor convallis.",image_url: "http://dummyimage.com/179x101.jpg/5fa2dd/ffffff", vendorId: vendorId, categoryId: categoryId, createdAt: new Date(), updatedAt: new Date()},
        { name: "Island Oasis - Mango Daiquiri", price: 373.28, quantity: 19, description: "Proin at turpis a pede posuere nonummy.",image_url: "http://dummyimage.com/161x212.jpg/5fa2dd/ffffff", vendorId: vendorId, categoryId: categoryId, createdAt: new Date(), updatedAt: new Date()},
        { name: "Cheese - Mascarpone", price: 141.73, quantity: 80, description: "Suspendisse accumsan tortor quis turpis.",image_url: "http://dummyimage.com/213x197.jpg/5fa2dd/ffffff", vendorId: vendorId, categoryId: categoryId, createdAt: new Date(), updatedAt: new Date()},
        { name: "Puree - Passion Fruit", price: 235.31, quantity: 75, description: "Aenean sit amet justo. Morbi ut odio.",image_url: "http://dummyimage.com/176x198.jpg/dddddd/000000", vendorId: vendorId, categoryId: categoryId, createdAt: new Date(), updatedAt: new Date()},
        { name: "Soup - Cream Of Broccoli", price: 874.11, quantity: 51, description: "Praesent blandit. Nam nulla.",image_url: "http://dummyimage.com/100x132.jpg/ff4444/ffffff", vendorId: vendorId, categoryId: categoryId, createdAt: new Date(), updatedAt: new Date()},
        { name: "Doilies - 7, Paper", price: 407.66, quantity: 67, description: "Morbi non quam nec dui luctus rutrum.",image_url: "http://dummyimage.com/102x110.jpg/ff4444/ffffff", vendorId: vendorId, categoryId: categoryId, createdAt: new Date(), updatedAt: new Date()},
        { name: "Rum - Mount Gay Eclipes", price: 204.41, quantity: 50, description: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.",image_url: "http://dummyimage.com/125x204.jpg/dddddd/000000", vendorId: vendorId, categoryId: categoryId, createdAt: new Date(), updatedAt: new Date()},
        { name: "Pepsi, 355 Ml", price: 811.34, quantity: 84, description: "Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.",image_url: "http://dummyimage.com/173x183.jpg/cc0000/ffffff", vendorId: vendorId, categoryId: categoryId, createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Products', null, {});
  }
};
