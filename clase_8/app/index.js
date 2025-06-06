import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import sequelize, { connectToDatabase } from './config/database.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

await connectToDatabase();

// Sincronizar el modelo con la base de datos
await sequelize.sync({ force: false });

// Estas dos líneas te permiten simular __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import dotenv from 'dotenv';
import express from 'express';

import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// 🔐 Habilitar CORS solo para el frontend en desarrollo
app.use(
  cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true, // si necesitás cookies/autenticación cruzada
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);

// Contexto para los controladores

app.get('/', (req, res) => {
  // res.sendFile(__dirname + "/views/index.html");
  res.sendFile(__dirname + '/views/index.html');
});

//Rutas para productos
//app.use("/api/products", productRoutes);
// app.get("/products", (req, res) => {
//   //llamar al endpoint para obtener los productos
//   res.sendFile(__dirname + "/views/products.html");
// });

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
