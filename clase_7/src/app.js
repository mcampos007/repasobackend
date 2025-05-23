import express from "express";
import UserManager from "./manager/userManager.js";
import ProductManager from "./manager/ProductManager.js";
//           message: "El nombre debe tener al menos 3 caracteres",

const userManager = new UserManager("./src/usuarios.json");
const productManager = new ProductManager("./src/productos.json");

const app = express();
const PORT = 8080;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de usuarios");
});

//Rutas de usuarios
app.get("/users", async (req, res) => {
  try {
    const users = await userManager.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//Ruta para crear el usuario
app.post("/users", async (req, res) => {
  try {
    console.log(req.body);

    const newUser = await userManager.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//Ruta para buscar usuario por id
app.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userManager.getUserById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//Ruta para actualizar usuario por id
app.put("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await userManager.updateuser(userId, req.body);
    console.log(updatedUser);

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "Usuario no Actualizado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//Ruta para eliminar usuario por id
app.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await userManager.deleteUser(userId);
    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Rutas de productos
//Recuperar todos los productos
app.get("/products", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//Buscar Producto por ID
app.get("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productManager.getProductById(productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//Crear Producto
app.post("/products", async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//Actualizar Producto por ID
app.put("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await productManager.updateproduct(
      productId,
      req.body
    );
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//delete product by id
app.delete("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await productManager.deleteProduct(productId);
    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(404).json({ message: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
