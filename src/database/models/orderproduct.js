'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {});
  OrderProduct.associate = function(models) {
    // associations can be defined here
  };
  return OrderProduct;
};
