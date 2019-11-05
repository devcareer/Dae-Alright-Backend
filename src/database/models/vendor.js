export default (sequelize, DataTypes) => {
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
  return Vendor;
};
