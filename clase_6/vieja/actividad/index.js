import expres from "express";

//Variables de configuracion
const PORT = "8080";
const msgwelcome =
  '<h1 style="background-color: blue; color: white;"> Bienvenido a la aplicación</h1>';
const userObj = {
  name: "Juan",
  lastname: "Perez",
  age: 25,
};

//Rutas a crear
const welcome = "/welcome";
const user = "/user";

//Definir el servidor
const app = expres();

//Ruta de bienvenida
app.get(welcome, (req, res) => {
  res.send(msgwelcome);
});

//Ruta de usuario
app.get(user, (req, res) => {
  //res.send(userObj);
  res.json(userObj);
});

//Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
