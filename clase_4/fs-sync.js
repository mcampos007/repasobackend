//const fs = require('fs');

import fs from "fs";

//Método sincronico de escritura de archivos
const fileName = "./fs-sync.txt";
if (fs.existsSync(fileName)) {
  fs.unlinkSync(fileName);
  console.log(1, "Archivo eliminado");
}
fs.writeFileSync(fileName, "Hola mundo sincronico áéíóú");

if (fs.existsSync(fileName)) {
  console.log(2, "Archivo existente, entonces agrego");
  const content =
    fs.readFileSync(fileName, "utf-8") + "\n" + "Agrego contenido";
  fs.writeFileSync(fileName, content);
  fs.appendFileSync(fileName, "\n" + "Agrego contenido con appendFileSync");
  console.log(3, "Contenido agregado");
  console.log(4, fs.readFileSync(fileName, "utf-8"));
}
