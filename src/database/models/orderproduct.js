module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  OrderProduct.associate = function(models) {
    // associations can be defined here
  };
  return OrderProduct;
};
