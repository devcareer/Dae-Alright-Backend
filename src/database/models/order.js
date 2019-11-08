export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    quantity: DataTypes.INTEGER,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, {});

  Order.associate = models => {
    Order.belongsTo(models.User, {
      foreignKey: 'customerId',
      onDelete: 'NO ACTION'
    });
    Order.belongsTo(models.Vendor, {
      foreignKey: 'vendorId',
      onDelete: 'NO ACTION'
    });
    Order.belongsToMany(models.Product, {
      through: 'OrderProduct',
      foreignKey: 'orderId',
      otherKey: 'productId',
      onDelete: 'NO ACTION',
    });
  };
  return Order;
};
