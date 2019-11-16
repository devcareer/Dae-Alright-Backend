export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
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

  Order.associate = models => {
    Order.belongsTo(models.User, {
      foreignKey: {
        name: 'customerId',
        field: 'customer_id',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    });
    Order.belongsTo(models.Vendor, {
      foreignKey: {
        name: 'vendorId',
        field: 'vendor_id',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    });
    Order.belongsToMany(models.Product, {
      through: models.OrderProduct,
      foreignKey: {
        name: 'orderId',
        field: 'order_id',
      },
      otherKey: {
        name: 'productId',
        field: 'product_id',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    });
  };
  return Order;
};
