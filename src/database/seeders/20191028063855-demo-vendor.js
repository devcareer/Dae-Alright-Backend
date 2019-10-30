module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Vendors',
      [
        {
          name: "Bluezoom",
          email: "dfantham0@nymag.com",
          password: "12345",
          location: "5773 Clemons Street",
          phone: "199-325-6137",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Gabvine",
          email: "gfynan1@quantcast.com",
          password: "12345",
          location: "708 Summer Ridge Street",
          phone: "157-681-3105",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Skyvu",
          email: "soldfield2@umn.edu",
          password: "12345",
          location: "494 Trailsway Place",
          phone: "172-868-4541",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Vidoo",
          email: "rdiver3@technorati.com",
          password: "12345",
          location: "728 Talisman Junction",
          phone: "272-275-8771",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Dabvine",
          email: "nhenderson4@cmu.edu",
          password: "12345",
          location: "38606 Green Drive",
          phone: "752-586-6338",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Pixope",
          email: "nkassel5@unesco.org",
          password: "12345",
          location: "3 Coleman Hill",
          phone: "977-817-9356",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Omba",
          email: "gtabert6@arstechnica.com",
          password: "12345",
          location: "33589 Portage Point",
          phone: "887-653-9511",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Einti",
          email: "mfeely7@a8.net",
          password: "12345",
          location: "885 Anderson Junction",
          phone: "797-266-0168",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Rhybox",
          email: "rspeer8@va.gov",
          password: "12345",
          location: "84 Declaration Trail",
          phone: "960-423-7167",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Mydeo",
          email: "ciggalden9@paypal.com",
          password: "12345",
          location: "2 Boyd Alley",
          phone: "874-612-9083",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
      );
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
