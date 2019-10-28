module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1
    },
    date: DataTypes.DATE,
  }, {});
  Sale.associate = (models) => {
    Sale.belongsTo(models.Order, { foreignKey: 'orderId', onDelete: 'NO ACTION' });
  };
  return Sale;
};
