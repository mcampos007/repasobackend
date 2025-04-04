import express from "express";
import { ProductManager } from "./productos/productManager.js";

const app = express();
const PORT = 3000;

const managerProducts = new ProductManager("src/data/products.json");

// Ejecutamos la función p correctamente
//p().catch((error) => console.error("Error al obtener productos:", error));

// Ruta para obtener todos los productos
app.get("/products", async (req, res) => {
  try {
    const { limit } = req.query;
    let products = await managerProducts.getProducts();
    if (limit && !isNaN(limit)) {
      products = products.slice(0, parseInt(limit));
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

//Ruta para obtener un producto
app.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    let producto = await managerProducts.getProductById(parseInt(pid));
    console.log(1, producto);
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
