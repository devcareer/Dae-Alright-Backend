import uuidv4 from 'uuid/v4';
import bcrypt from 'bcrypt';

export default {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Vendors', [{
      id: uuidv4(),
      name: 'Bluezoom',
      email: 'dfantham0@nymag.com',
      password: await bcrypt.hash('12345', await bcrypt.genSalt(+process.env.SALT)),
      location: '5773 Clemons Street',
      phone: '199-325-6137',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      name: 'Gabvine',
      email: 'gfynan1@quantcast.com',
      password: await bcrypt.hash('12345', await bcrypt.genSalt(+process.env.SALT)),
      location: '708 Summer Ridge Street',
      phone: '157-681-3105',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      name: 'Skyvu',
      email: 'soldfield2@umn.edu',
      password: await bcrypt.hash('12345', await bcrypt.genSalt(+process.env.SALT)),
      location: '494 Trailsway Place',
      phone: '172-868-4541',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      name: 'Vidoo',
      email: 'rdiver3@technorati.com',
      password: await bcrypt.hash('12345', await bcrypt.genSalt(+process.env.SALT)),
      location: '728 Talisman Junction',
      phone: '272-275-8771',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      name: 'Dabvine',
      email: 'nhenderson4@cmu.edu',
      password: await bcrypt.hash('12345', await bcrypt.genSalt(+process.env.SALT)),
      location: '38606 Green Drive',
      phone: '752-586-6338',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      name: 'Pixope',
      email: 'nkassel5@unesco.org',
      password: await bcrypt.hash('12345', await bcrypt.genSalt(+process.env.SALT)),
      location: '3 Coleman Hill',
      phone: '977-817-9356',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      name: 'Omba',
      email: 'gtabert6@arstechnica.com',
      password: await bcrypt.hash('12345', await bcrypt.genSalt(+process.env.SALT)),
      location: '33589 Portage Point',
      phone: '887-653-9511',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      name: 'Einti',
      email: 'mfeely7@a8.net',
      password: await bcrypt.hash('12345', await bcrypt.genSalt(+process.env.SALT)),
      location: '885 Anderson Junction',
      phone: '797-266-0168',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      name: 'Rhybox',
      email: 'rspeer8@va.gov',
      password: await bcrypt.hash('12345', await bcrypt.genSalt(+process.env.SALT)),
      location: '84 Declaration Trail',
      phone: '960-423-7167',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      name: 'Mydeo',
      email: 'ciggalden9@paypal.com',
      password: await bcrypt.hash('12345', await bcrypt.genSalt(+process.env.SALT)),
      location: '2 Boyd Alley',
      phone: '874-612-9083',
      created_at: new Date(),
      updated_at: new Date(),
    }
    ], {}
  ),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Vendors', null, {})
};
