export default (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    date: DataTypes.DATE,
  }, {});

  Sale.associate = (models) => {
    Sale.belongsTo(
      models.Order,
      { foreignKey: 'orderId', onDelete: 'NO ACTION' }
    );
  };
  return Sale;
};
