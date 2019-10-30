module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',
      [
        {
          firstName: "Pegeen",
          lastName: "Rayhill",
          email: "prayhill0@yelp.com",
          password: "12345",
          address: "5 Fair Oaks Road",
          phone: "983-515-5106",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Alard",
          lastName: "Shevill",
          email: "ashevill1@digg.com",
          password: "12345",
          address: "58 Mallory Parkway",
          phone: "885-594-5404",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Cairistiona",
          lastName: "Arnaudet",
          email: "carnaudet2@lycos.com",
          password: "12345",
          address: "84821 Redwing Crossing",
          phone: "795-401-5699",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Cherie",
          lastName: "Halfhyde",
          email: "chalfhyde3@youku.com",
          password: "12345",
          address: "45 Waywood Hill",
          phone: "281-247-4610",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Daniel",
          lastName: "Gosneye",
          email: "dgosneye4@si.edu",
          password: "12345",
          address: "501 Texas Junction",
          phone: "696-578-2870",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Jessi",
          lastName: "Bowlesworth",
          email: "jbowlesworth5@furl.net",
          password: "12345",
          address: "3317 Red Cloud Plaza",
          phone: "705-251-1071",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Deena",
          lastName: "Dowker",
          email: "ddowker6@last.fm",
          password: "12345",
          address: "37868 Corry Court",
          phone: "369-695-8421",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Felice",
          lastName: "Whiteman",
          email: "fwhiteman7@hao123.com",
          password: "12345",
          address: "71 Division Point",
          phone: "497-572-4449",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Raychel",
          lastName: "Handyside",
          email: "rhandyside8@mysql.com",
          password: "12345",
          address: "867 Thierer Way",
          phone: "920-553-7093",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Orella",
          lastName: "Tipler",
          email: "otipler9@microsoft.com",
          password: "12345",
          address: "4622 South Crossing",
          phone: "951-228-8616",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
      );
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
