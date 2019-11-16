import uuidv4 from 'uuid/v4';

export default {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    const userId = await queryInterface.rawSelect('Users', {}, ['id']);
    const vendorId = await queryInterface.rawSelect('Vendors', {}, ['id']);
    if (!(userId && vendorId)) throw new Error("Invalid 'userId' or 'vendorId'");

    return queryInterface.bulkInsert(
      'Reviews',
      [
        {
          id: uuidv4(),
          ratings: 0,
          title: 'pretium iaculis diam erat fermentum',
          content: 'fusce posuere felis sed lacus morbi sem mauris laoreet',
          user_id: userId,
          vendor_id: vendorId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          ratings: 4,
          title: 'fusce congue diam',
          content: 'fusce congue diam id',
          user_id: userId,
          vendor_id: vendorId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          ratings: 4,
          title: 'cursus vestibulum proin',
          content: 'luctus tincidunt nulla mollis molestie lorem quisque ut',
          user_id: userId,
          vendor_id: vendorId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          ratings: 0,
          title: 'nisi volutpat eleifend donec ut',
          content: 'nulla suspendisse potenti cras in purus',
          user_id: userId,
          vendor_id: vendorId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          ratings: 0,
          title: 'suspendisse potenti',
          content: 'mauris viverra diam',
          user_id: userId,
          vendor_id: vendorId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          ratings: 5,
          title: 'felis',
          content: 'erat curabitur gravida nisi at nibh',
          user_id: userId,
          vendor_id: vendorId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          ratings: 3,
          title: 'in est risus',
          content: 'tincidunt eu felis fusce posuere felis sed lacus',
          user_id: userId,
          vendor_id: vendorId,
          created_at:
          new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          ratings: 1,
          title: 'duis ac nibh fusce lacus',
          content: 'semper porta volutpat',
          user_id: userId,
          vendor_id: vendorId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          ratings: 3,
          title: 'nunc viverra dapibus',
          content: 'lacus purus',
          user_id: userId,
          vendor_id: vendorId,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          ratings: 5,
          title: 'eros',
          content: 'sit amet sapien dignissim',
          user_id: userId,
          vendor_id: vendorId,
          created_at: new Date(),
          updated_at: new Date(),
        }
      ],
      {}
    );
  },

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Reviews', null, {})
};
