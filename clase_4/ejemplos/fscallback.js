import fs, { writeFile } from "fs";
// Escribiendo contenido en un archivo
const data = "Escribiendo datos en un archivo";
const newLine = "\nEs una nueva linea del archivo";

const name = "./callbackFile.txt";

console.log(data);

fs.writeFile(name, data, (error) => {
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

  //Agregar datos al archivo
  fs.appendFile(name, newLine, (error) => {
    if (error) {
      return console.log("Hubo error al agregar datos al atrchivo");
    }

    fs.readFile(name, "utf-8", (error, newContent) => {
      if (error) {
        console.log("Hubo error al leer el archivo actualizado");
      }
      console.log(`El nuevo contenido es \n ${newContent}`);
    });
  });
});
