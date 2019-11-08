export default (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    date: DataTypes.DATE,
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

  Sale.associate = (models) => {
    Sale.belongsTo(models.Order, {
      foreignKey: 'orderId',
      onDelete: 'NO ACTION'
    });
  };
  return Sale;
};
