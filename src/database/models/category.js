export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING
  }, {});

  Category.associate = (models) => {
    Category.hasMany(
      models.Product,
      { foreignKey: 'categoryId', onDelete: 'NO ACTION' }
    );
  };
  return Category;
};
