export default (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    ratings: DataTypes.INTEGER,
    title: DataTypes.TEXT,
    content: DataTypes.TEXT
  }, {});

  Review.associate = (models) => {
    Review.belongsTo(
      models.User,
      { foreignKey: 'userId', onDelete: 'NO ACTION' }
    );
    Review.belongsTo(
      models.Vendor,
      { foreignKey: 'vendorId', onDelete: 'NO ACTION' }
    );
  };
  return Review;
};
