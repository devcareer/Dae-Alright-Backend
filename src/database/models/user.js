const bcrypt = require('bcrypt');
const { config } = require('dotenv');

config();

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.TEXT
  }, {});

  User.beforeCreate(async user => {
    user.password = await user.generatePasswordHash();
  });

  User.prototype.generatePasswordHash = async function generatePasswordHash() {
    const saltRounds = +process.env.SALT;
    return bcrypt.hash(this.password, saltRounds);
  };

  User.prototype.getSafeDataValues = function getSafeDataValues() {
    const { password, ...data } = this.dataValues;
    return data;
  }

  User.prototype.validatePassword = async function validatePassword(password) {
    return bcrypt.compare(password, this.password);
  };

  User.associate = (models) => {
    User.hasMany(
      models.Review,
      { foreignKey: 'userId', onDelete: 'NO ACTION' }
    );
    User.hasMany(
      models.Order,
      { foreignKey: 'customerId', onDelete: 'NO ACTION' }
    );
  };

  return User;
};
