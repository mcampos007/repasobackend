import fs from "fs";

const fileName = "./fs-sync.txt";

if (fs.existsSync(fileName)) {
  fs.readFile(fileName, "utf-8", (error, info) => {
    if (error) {
      console.log(wrror);
    } else {
      console.log(info);
    }
  });
}

fs.appendFile(fileName, "Nueva data agregada", (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Información agregada con exito");
  }
});
