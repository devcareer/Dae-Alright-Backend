module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  return OrderProduct;
};
