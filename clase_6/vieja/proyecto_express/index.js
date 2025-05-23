import express from "express";

const app = express();

//Definir la ruta principal
const saludo = "<h1>Hola mundo!!</h1>";

app.get("/", (req, res) => {
  res.send(saludo);
});

//INiciar el servidor
app.listen(8080, () => {
  console.log("Servidor iniciado en http://localhost:8080");
});
