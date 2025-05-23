import mysql from "mysql2/promise";

// Configuración de la base de datos
const dbConfig = {
  host: "localhost", // Cambia según tu configuración
  user: "root", // Usuario de MySQL
  password: "", // Contraseña de MySQL
  database: "sistema-ventas", // Nombre de la base de datos
};

// Función para conectarse
async function connectDB() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("Conectado a MySQL correctamente");
    return connection;
  } catch (error) {
    console.error("Error de conexión a MySQL:", error);
    throw error; // Es buena práctica lanzar el error para que el llamador lo maneje
  }
}

// Función para cerrar la conexión
async function closeDB(connection) {
  if (!connection) return; // Si no hay conexión, no hacer nada

  try {
    await connection.end();
    console.log("Conexión cerrada correctamente");
  } catch (err) {
    console.error("Error cerrando la conexión:", err);
  }
}

// Exportar funciones de forma nombrada
export { connectDB, closeDB };
