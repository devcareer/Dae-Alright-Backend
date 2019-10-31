const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Vendor = sequelize.define('Vendor', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    location: DataTypes.TEXT
  }, {});

  Vendor.associate = (models) => {
    Vendor.hasMany(
      models.Review,
      { foreignKey: 'vendorId', onDelete: 'NO ACTION' }
    );
    Vendor.hasMany(
      models.Product,
      { foreignKey: 'vendorId', onDelete: 'NO ACTION' }
    );
    Vendor.hasMany(
      models.Order,
      { foreignKey: 'vendorId', onDelete: 'NO ACTION' }
    );
  };

  // eslint-disable-next-line no-unused-vars
  Vendor.beforeCreate(async vendor => {
    // eslint-disable-next-line no-param-reassign
    vendor.password = await vendor.generatePasswordHash();
  });
  Vendor.prototype.generatePasswordHash = async function generatePasswordHash() {
    const saltRounds = +process.env.SALT;
    hashedPassword = await bcrypt.hash(this.password, saltRounds);
    return hashedPassword;
  };
  Vendor.prototype.validatePassword = async function validatePassword(password) {
    return bcrypt.compare(password, this.password);
  };
  Vendor.prototype.getSafeDataValues = function getSafeDataValues() {
    const { password, ...data } = this.dataValues;
    return data;
  };
  return Vendor;
};
