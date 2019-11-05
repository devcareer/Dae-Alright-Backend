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
    image_url: DataTypes.STRING
  }, {});

  Product.associate = (models) => {
    Product.belongsTo(
      models.Category,
      { foreignKey: 'categoryId', onDelete: 'NO ACTION' }
    );
    Product.belongsToMany(models.Order, {
      through: 'OrderProduct',
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
