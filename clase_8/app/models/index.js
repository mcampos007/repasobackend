// models/index.js
import sequelize from '../config/database.js';
import defineCategory from './category.js';
import defineProduct from './product.js';
import defineUser from './user.js';

// Inicializar los modelos con la conexión sequelize
const Category = defineCategory(sequelize);
const Product = defineProduct(sequelize);
const User = defineUser(sequelize);

// Establecer relaciones
Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
// Exportar los modelos
export { Category, Product, User };
// export default {
//   Category,
//   Product,
// };

// Sincronizar los modelos con la base de datos
await sequelize.sync(); // Crea las tablas si no existen
// await sequelize.sync({ force: true }); // ⚠️ Borra y vuelve a crear todas las tablas (solo para desarrollo)

console.log('✅ Tablas sincronizadas correctamente');
