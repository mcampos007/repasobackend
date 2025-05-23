import express from "express";

const app = express();
const PORT = 8080;

//urlencoded
app.use(express.urlencoded({ extended: true }));

//Usuarios example
const usuarios = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Perez",
  },
  {
    id: 2,
    nombre: "Ana",
    apellido: "Gomez",
  },
  {
    id: 3,
    nombre: "Pedro",
    apellido: "Gonzalez",
  },
];

//bienvenido
app.get("/", (req, res) => {
  console.log(`Parametros Recibidos: ${JSON.stringify(req.params)}`);
  console.log(`Query recibido: ${JSON.stringify(req.query)}`);

  const { nombre } = req.query;

  if (nombre) {
    const usuario = usuarios.find(
      (usuario) => usuario.nombre === req.query.nombre
    );
    if (usuario) {
      return res.json(usuario);
    } else {
      return res.status(404).send("Usuario no encontrado");
    }
  }
  res.send("Hello World!");
});

//Lista de usuarios
app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

//Usuario por id
app.get("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const usuario = usuarios.find((usuario) => usuario.id === Number(id));
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).send("Usuario no encontrado");
  }
});

//

//Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
