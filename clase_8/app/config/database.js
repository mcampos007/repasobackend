// database.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('db_sistema', 'root', 'secret123', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});


// Función de conexión
export async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a MySQL establecida correctamente');
    // await sequelize.sync(); // descomentá si querés que cree/modifique tablas automáticamente
  } catch (error) {
    console.error('❌ Error al conectar con MySQL:', error);
    throw error;
  }
}

// Exportar sequelize y modelos
export default sequelize ;

