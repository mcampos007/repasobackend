import fs from "fs";
// Escribiendo contenido en un archivo
const data = "Escribiendo datos en un archivo";
const name = "./firstFile.txt";
console.log(data);

fs.writeFileSync(name, data);

// VErificar que exista el

if (fs.existsSync(name)) {
  console.log(`El Archivo ${name} si Existe'`);
  const dataRead = fs.readFileSync(name, "utf-8");

  //Leyendo un archivo
  console.log("**** El contenido es el siguientye");
  console.log(dataRead);
}

//Agregar contenido a un archivo

const newLine = "\nEs una nueva linea del archivo";
if (fs.existsSync(name)) {
  //Agegando la nueva linea
  fs.appendFileSync(name, newLine);

  //Leyendo el contenido
  const newContent = fs.readFileSync(name, "utf-8");
  console.log(`El contenido del archivo es \n ${newContent}`);

  //Eliminar el archivo
  console.log("eliminando el archivo");
  fs.unlinkSync(name);
}
