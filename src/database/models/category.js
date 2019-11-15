export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'updated_at',
    },
  }, {});

  Category.associate = (models) => {
    Category.hasMany(models.Product, {
      foreignKey: {
        name: 'categoryId',
        field: 'category_id',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    });
  };
  return Category;
};
