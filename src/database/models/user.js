const bcrypt = require('bcrypt');
<<<<<<< HEAD
const { config } = require('dotenv');

config();
=======
>>>>>>> ch-setup-db_add-seeds

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID
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

<<<<<<< HEAD
=======
  // eslint-disable-next-line no-unused-vars
  User.beforeCreate(async user => {
    // eslint-disable-next-line no-param-reassign
    user.password = await user.generatePasswordHash();
  });
  User.prototype.generatePasswordHash = async function generatePasswordHash() {
    const saltRounds = +process.env.SALT;
    hashedPassword = await bcrypt.hash(this.password, saltRounds);
    return hashedPassword;
  };
  User.prototype.validatePassword = async function validatePassword(password) {
    return bcrypt.compare(password, this.password);
  };
  User.prototype.getSafeDataValues = function getSafeDataValues() {
    const { password, ...data } = this.dataValues;
    return data;
  };
>>>>>>> ch-setup-db_add-seeds
  return User;
};
