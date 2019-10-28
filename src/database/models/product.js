module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING
  }, {});

  Product.associate = (models) => {
    Product.belongsTo(
      models.Category,
      { foreignKey: 'categoryId', onDelete: 'NO ACTION' }
    );
    Product.belongsToMany(models.Order, {
      through: models.OrderProduct,
      foreignKey: 'productId',
      otherKey: 'orderId',
      onDelete: 'NO ACTION'
    });
    Product.belongsTo(
      models.Vendor,
      { foreignKey: 'vendorId', onDelete: 'NO ACTION' }
    );
  };
  return Product;
};
