import { log } from "console";
import fs from "fs";
import { json } from "stream/consumers";

const fileName = "./fs-sync.json";

const productos = [
  {
    id: 1,
    producto: "Item 1",
    stock: 100,
  },
  {
    id: 2,
    producto: "Item 2",
    stock: 500,
  },
];

const productos2 = [
  {
    id: 3,
    producto: "Item 3",
    stock: 1000,
  },
  {
    id: 4,
    producto: "Item 4",
    stock: 5000,
  },
];

if (fs.existsSync(fileName)) {
  fs.promises
    .readFile(fileName, "utf-8")
    .then((info) => {
      console.log(info);
      return fs.promises.appendFile(fileName, JSON.stringify(productos2));
    })
    .then(() => console.log("Info agregada con exito"))
    .catch((error) => {
      console.log(error);
    });
} else {
  console.log("Creación del Archivo porque no existe");
  fs.promises
    .writeFile(fileName, JSON.stringify(productos))
    .then(() => console.log("Archivo creado con exito"))
    .catch((error) => console.log(error));
}

//Mostrar el contenido del json
fs.promises
  .readFile(fileName, "utf-8")
  .then((data) => {
    console.log("Los datos del archivo son");
    console.log(JSON.parse(data));
  })
  .catch((error) => console.log(error));
