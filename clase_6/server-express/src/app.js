import express from "express";
import products from "../data/products.json" assert { type: "json" };

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.send("<H1>Hola Mundo!!</H1");
});

app.get("/home", (req, res) => {
  console.log(req);

  res.send("Pagina Principal");
});
app.get("/products", (req, res) => {
  const { price } = req.query;
  const productFilter = products.filter(
    (product) => product.price >= Number(price)
  );
  console.log(1, productFilter);
  res.status(200).json(productFilter);
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  console.log(1, `Id: ${id}`);

  const product = products.find((prod) => prod.id === Number(id));
  let data = "";

  if (!product) {
    data = { error: "Product not found" };
    return res.status(404).json(data);
  }

  res.status(200).json(product);
  console.log(2, `Producto Buscado: ${JSON.stringify(product)}`);
});

app.listen(PORT, () => console.log(`Servidor running in port:${PORT}`));
