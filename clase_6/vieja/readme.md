# CLASE Nª6

## Servidores WEB

### Glosario

- Node.js
- Módulo
- Módulo Nativo
- package.json
- Dependencias
- Dependencia local
- Dependencia global
- Versión

### Protocolo HTTP - Servidores - Express

- Verbos (GET POST PUT/PATCH DELETE)
- Se basa en el modelo peticion/respuesta Client/Server
- Tipos de información que se solicita un dato/imagenes/videos/html/json/páginas web completas/etc
- Maneja múltiples peticiones
- Se define un puerto para escuchar peticiones
- el cliente realiza las peticiones (request) el servidor responde (response)

### Requerimientos para implementar un servidor

- instalar nodemon de manera global npm i -g nodemon
- Crear un servidor utilizando http
- nodemon server.js

_ejemplo de servidor hhtp_

```bash
import { log } from "console";
import http from "http";

const server = http.createServer((req, res) => {
  res.end("Hello World!");
});

server.listen(8080, () => {
  log("Server running on port 3000");
});
```

### Servidor Express js

- Es un framework minimalista que permite desarrollar servidores complejos
- Mejora la estructura del proyecto
- Utiliza middlewares
  Instalacion de express npm i express. Recomiendo crear un script npm run dev
- ejemplo de un servidor básico

```bash

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

```

### Actividad en Clase

- Definir enpoint de bienvenida /bienvenida devolver html con letras de color azul
- Definir endpoint /usuario devolver un objeto con los datos de un usuario {name, last_name. age, email}

```bash
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
  res.send(userObj);
});

//Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
```

## Objeto request

-request.query
generalmente se utiliza en busquedas
-request.params

## Entregable - Servidor con Express

- Tomar ProductManager
- **consiga** Desarrollar servidor express basado en express donde podamos hacer consultas a nuestro archivo de productos
- **Aspectos a incluir**: Utilizar la clase ProductManager con persistencia de archivos.
- Desarrollar un servidor express en app.js que importe el productManager que tenemos
- Definir los siguientes endpoint
- ruta /products: debe leer el arvhivo productos y devolverlos dentro de un objeto. Agregar el soporte para recibir por queryparams el valor ?limit= el cual indicará la cantida máxima de productos a devolver
- Si no se recibe el query se deben devolver todos los productos
- Si se recibe límite , devolver solo la cantidad de productos solicitados
- Ruta '/products/:pid' la cual debe recibir por req.params el pid {product.id} y devolver solo el procuto solicitado en lugar de todos

**Se completo la vista del video de la clase. Queda hacer el Desafio entregable**
