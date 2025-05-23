import { dirname } from "path";
import { fileURLToPath } from "url";

// Estas dos líneas te permiten simular __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import dotenv from "dotenv";
import express from "express";

import productRoutes from "./routes/productRoutes.js"; // asegurate de que el path sea correcto

import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));
// app.use(express.static(__dirname + "/app/public"));
// app.use(express.static("views"));
// app.use(express.static("assets"));
// app.use(express.static("assets/css"));
// app.use(express.static("assets/js"));
// app.use(express.static("assets/img"));
// app.use(express.static("assets/fonts"));
// app.use(express.static("assets/icons"));
// app.use(express.static("assets/icons/flags"));

app.get("/", (req, res) => {
  // res.sendFile(__dirname + "/views/index.html");
  res.sendFile(__dirname + "/views/index.html");
});

//Rutas para productos
app.use("/api/products", productRoutes);
app.get("/products", (req, res) => {
  //llamar al endpoint para obtener los productos
  res.sendFile(__dirname + "/views/products.html");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
