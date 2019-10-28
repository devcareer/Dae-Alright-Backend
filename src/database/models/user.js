//const hashPassword = require('../../helpers/hash-password');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.TEXT
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Review, { foreignKey: 'userId', onDelete: 'NO ACTION' });
    User.hasMany(models.Order, { foreignKey: 'customerId', onDelete: 'NO ACTION' });
  };
  // eslint-disable-next-line no-unused-vars
  /*User.addHook('beforeCreate', async (user, options) => {
    const hashedPassword = await hashPassword(user.password);
    User.password = hashedPassword;
  });*/
  return User;
};
