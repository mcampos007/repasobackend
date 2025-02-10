import express from "express";
import { promises as fs } from "fs";
import { ProductManager } from "./product_manager.js";
import { Product } from "./product_manager.js";

const app = express();
const PORT = 3000;
const path = "./src/data/";
const pM = new ProductManager(path);

// console.log("Listado de productos");
// const data = await pM.getProducts();
// console.log(data);

// Middleware urlencoded
app.use(express.urlencoded({ extended: true }));

//Endpoint para obtener todos los productos
app.get("/productos", async (req, res) => {
  try {
    const data = await pM.getProducts();
    const productos = JSON.parse(data);

    //Obtrener el parámetro limit
    let { limit } = req.query;

    //Convertir limit a number y verificar que sea positivo
    limit = parseInt(limit);

    if (!isNaN(limit) && limit > 0) {
      return res.json(productos.slice(0, limit));
    }

    res.json(productos);
  } catch (error) {
    console.log(error);
    res.status(404).send("No se encontraron productos");
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si es un número
    if (isNaN(id)) {
      return res.status(400).send("El ID debe ser un número.");
    }

    // Convertir a número (si es necesario)
    const idNumerico = parseInt(id, 10);
    const product = await pM.getProductById(idNumerico);

    return res.status(200).send(product);
    
  } catch (error) {
    console.log(error);
    res.status(400).send("Error al recuperar Product");
  }
});

//Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
