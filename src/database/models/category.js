module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1
    },
    name: DataTypes.STRING
  }, {});
  Category.associate = (models) => {
    Category.hasMany(models.Product, { foreignKey: 'categoryId', onDelete: 'NO ACTION' });
  };
  return Category;
};
