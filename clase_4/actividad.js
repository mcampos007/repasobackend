import fs from "fs";

const name = "./package.json";

const actividad = async (filename) => {
  try {
    const data = await fs.promises.readFile(filename, "utf-8");
    const stats = await fs.promises.stat(filename);

    const info = {
      contenidoStr: data,
      contenidoObj: JSON.parse(data),
      size: stats.size,
    };
    console.log(info);
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
  }
};

actividad(name);
