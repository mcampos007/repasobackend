import fs from "fs";

//Leer el archivo
const leerArchivo = async (filename) => {
  try {
    const result = await fs.promises.readFile(filename, "utf-8");
    if (result) {
      console.log(JSON.parse(result));
      return JSON.parse(result);
    }
  } catch (error) {
    console.log("Hubo Errores al leer el archivo");
  }
};

const name = "./data.json";

const rs = leerArchivo(name);
