import bcrypt from 'bcrypt';
import { config } from 'dotenv';

config();

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    socialID: {
      type: DataTypes.STRING,
      field: 'social_id'
    },
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name'
    },
    provider: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.TEXT,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'updated_at',
    },
  }, {});

  User.beforeCreate(async user => {
    user.password = await user.generatePasswordHash();
  });

  User.prototype.generatePasswordHash = async function generatePasswordHash() {
    if(!this.provider){
      const saltRounds = +process.env.SALT;
      return bcrypt.hash(this.password, saltRounds);
    }
  };

  User.prototype.getSafeDataValues = function getSafeDataValues() {
    const { password, socialID, provider,  ...data } = this.dataValues;
    return data;
  };

  User.prototype.validatePassword = async function validatePassword(password) {
    return bcrypt.compare(password, this.password);
  };

  User.associate = models => {
    User.hasMany(models.Review, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    });
    User.hasMany(models.Order, {
      foreignKey: {
        name: 'customerId',
        field: 'customer_id',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    });
  };
  return User;
};
