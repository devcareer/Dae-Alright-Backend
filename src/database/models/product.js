export default (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    imageUrl: {
      type: DataTypes.STRING,
      field: 'image_url'
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

  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: {
        name: 'categoryId',
        field: 'category_id',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    });
    Product.belongsToMany(models.Order, {
      through: models.OrderProduct,
      foreignKey: {
        name: 'productId',
        field: 'product_id',
      },
      otherKey: {
        name: 'orderId',
        field: 'order_id',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    });
    Product.belongsTo(models.Vendor, {
      foreignKey: {
        name: 'vendorId',
        field: 'vendor_id',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    });
  };
  return Product;
};
