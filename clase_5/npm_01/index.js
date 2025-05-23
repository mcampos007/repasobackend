import mysql from "mysql2/promise";
import { DBFFile } from "dbffile";
import { v4 as uuidv4 } from "uuid";

//Prueba de UUId
const newId = uuidv4();
console.log(`Nuevo Id: ${newId}`);

const newId2 = uuidv4();
console.log(`Nuevo Id: ${newId2}`);

// Configuración de conexión a MySQL
const dbConfig = {
  host: "localhost",
  user: "root", // Cambiar si es necesario
  password: "", // Cambiar si es necesario
  database: "sistema-ventas", // Nombre de tu base de datos
};

async function syncDBFToMySQL() {
  try {
    // 1. Conectar a MySQL
    const connection = await mysql.createConnection(dbConfig);
    console.log("Conectado a MySQL correctamente.");

    // 2. Abrir el archivo DBF
    const dbfFile = await DBFFile.open("./dbfs/rubro.dbf");
    console.log(`Leyendo ${dbfFile.recordCount} registros de rubro.dbf...`);

    // 3. Iterar sobre los registros del DBF
    for await (const record of dbfFile) {
      const codigo = record.CODIGO_R.trim(); // Limpiar espacios en blanco
      const nombre = record.NOM_R.trim();

      // 4. Verificar si el registro ya existe en MySQL
      const [rows] = await connection.execute(
        "SELECT id FROM categorias WHERE id = ?",
        [codigo]
      );

      if (rows.length > 0) {
        // Si existe, hacer un UPDATE
        await connection.execute(
          "UPDATE categorias SET nombre = ? WHERE id = ?",
          [nombre, codigo]
        );
        console.log(`Actualizado: ${codigo} - ${nombre}`);
      } else {
        // Si no existe, hacer un INSERT
        await connection.execute(
          "INSERT INTO categorias (id, nombre, user_id) VALUES (?, ?, 1)",
          [codigo, nombre]
        );
        console.log(`Insertado: ${codigo} - ${nombre}`);
      }
    }

    // 5. Cerrar la conexión a MySQL
    await connection.end();
    console.log("Proceso completado y conexión cerrada.");
  } catch (error) {
    console.error("Error al sincronizar datos:", error);
  }
}

// Ejecutar la función
//syncDBFToMySQL();
