import fs from "fs";

const operaciones = async (filename, content, newContent) => {
  try {
    console.log("Se va a crear un archivo");

    await fs.promises.writeFile(filename, content);

    console.log("El contenido del archivo creado es :");
    let contenido = await fs.promises.readFile(filename, "utf-8");
    console.log(contenido);

    console.log("Ahora vamos a agregar mas contenido al archivo");
    await fs.promises.appendFile(filename, newContent);

    console.log("El contenido del archivo actualizado es :");
    contenido = await fs.promises.readFile(filename, "utf-8");
    console.log(contenido);

    console.log("Vamos a eliminar el archivo");

    await fs.promises.unlink(filename);
  } catch (error) {
    console.log("Hubo un error");
  }
};

operaciones(
  "./fspromises.txt",
  "Contenido inicial del archivo\n segunda linea del archivo\n",
  "Contenido Adicional del archivo"
);
