export default (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    imageUrl: {
      type: DataTypes.STRING,
      field: 'image_url'
    },
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

  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      onDelete: 'NO ACTION'
    });
    Product.belongsToMany(models.Order, {
      through: 'OrderProduct',
      foreignKey: 'productId',
      otherKey: 'orderId',
      onDelete: 'NO ACTION'
    });
    Product.belongsTo(models.Vendor, {
      foreignKey: 'vendorId',
      onDelete: 'NO ACTION'
    });
  };
  return Product;
};
