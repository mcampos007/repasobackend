import http from "http";
import products from "./data/products.json" assert { type: "json" };

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Hola Mundo !!!!,  desde el server nodejs");
  }

  if (req.url === "/products") {
    res.end(JSON.stringify(products));
  }
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor Escuchando en puerto ${PORT}`);
});
