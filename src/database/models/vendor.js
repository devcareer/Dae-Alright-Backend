import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const Vendor = sequelize.define('Vendor', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    location: DataTypes.TEXT,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'updated_at',
    },
  }, {});

  Vendor.beforeCreate(async vendor => {
    vendor.password = await vendor.generatePasswordHash();
  });

  Vendor.prototype.generatePasswordHash = async function generatePasswordHash() {
    const saltRounds = +process.env.SALT;
    return bcrypt.hash(this.password, saltRounds);
  };

  Vendor.prototype.getSafeDataValues = function getSafeDataValues() {
    const { password, ...data } = this.dataValues;
    return data;
  };

  Vendor.prototype.validatePassword = async function validatePassword(password) {
    return bcrypt.compare(password, this.password);
  };

  Vendor.associate = (models) => {
    Vendor.hasMany(models.Review, {
      foreignKey: {
        name: 'vendorId',
        field: 'vendor_id',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    });
    Vendor.hasMany(models.Product, {
      foreignKey: {
        name: 'vendorId',
        field: 'vendor_id',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    });
    Vendor.hasMany(models.Order, {
      foreignKey: {
        name: 'vendorId',
        field: 'vendor_id',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    });
  };
  return Vendor;
};
