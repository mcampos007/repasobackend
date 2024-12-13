// Se debe almacenar y leer en unarchiov la fecha y hora

//
import fs from "fs";
// Escribiendo contenido en un archivo
const ahora = new Date();
const fechaHora = `${ahora.getDate()}/${
  ahora.getMonth() + 1
}/${ahora.getFullYear()} ${ahora.getHours()}:${ahora.getMinutes()}:${ahora.getSeconds()}`;
console.log(fechaHora); // E.g., "10/12/2024 14:35:50"

const name = "./actividad.txt";

fs.writeFileSync(name, fechaHora);

if (fs.existsSync(name)) {
  console.log(`El Archivo ${name} si Existe'`);
  const dataRead = fs.readFileSync(name, "utf-8");

  //Leyendo un archivo
  console.log("**** El contenido es el siguientye");
  console.log(dataRead);
}

// con callback
console.log("***********************************");

fs.writeFile(name, fechaHora, (error) => {
  if (error) {
    return console.log("Hubo un error al crear el archivo");
  }

  //Leer el archivo
  fs.readFile(name, "utf-8", (error, contenido) => {
    if (error) {
      return console.log("Hubo un error al leer el archivo");
    }
    console.log(contenido);
  });
});
