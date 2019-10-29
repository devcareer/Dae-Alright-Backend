// const hashPassword = require('../../helpers/hash-password');

module.exports = (sequelize, DataTypes) => {
  const Vendor = sequelize.define('Vendor', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
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
  /** Vendor.addHook('beforeCreate', async (vendor, options) => {
    const hashedPassword = await hashPassword(vendor.password);
    Vendor.password = hashedPassword;
  }); */
  return Vendor;
};
