// models/initModels.js
import CategoryDef from './category.js';
import ProductDef from './product.js';

export function initModels(sequelize) {
  const Category = CategoryDef(sequelize);
  const Product = ProductDef(sequelize);

  // Asociaciones
  Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
  Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });

  return {
    Product,
    Category,
  };
}
