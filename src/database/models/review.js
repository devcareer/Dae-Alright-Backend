export default (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    ratings: DataTypes.INTEGER,
    title: DataTypes.TEXT,
    content: DataTypes.TEXT,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'updated_at',
    },
  }, {});

  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    });
    Review.belongsTo(models.Vendor, {
      foreignKey: {
        name: 'vendorId',
        field: 'vendor_id',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    });
  };
  return Review;
};
