module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  }, {});

  Sale.associate = (models) => {
    Sale.belongsTo(
      models.Order,
      { foreignKey: 'orderId', onDelete: 'NO ACTION' }
    );
  };
  return Sale;
};
