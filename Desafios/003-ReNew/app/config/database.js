import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('db_sistema', 'root', 'secret123', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

export default async function createSequelize() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a MySQL establecida correctamente');
    return sequelize;
  } catch (error) {
    console.error('❌ Error al conectar con MySQL:', error);
    throw error;
  }
}


