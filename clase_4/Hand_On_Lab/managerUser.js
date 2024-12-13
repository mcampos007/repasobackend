import fs from "fs";

class managerUser {
  constructor(fileName) {
    this.fileName = fileName;
    if (fs.existsSync(fileName)) {
      try {
        let usuarios = fs.readFileSync(fileName, "utf-8");
        this.usuarios = JSON.parse(usuarios);
      } catch (error) {
        this.usuarios = [];
      }
    } else {
      this.usuarios = [];
    }
    // console.log(`el archivo ${fileName} No existe !!!`);
  }

  async saveFile(data) {
    try {
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(data, null, "\t")
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async createUser(usuario) {
    this.usuarios.push(usuario);

    const respuesta = await this.saveFile(this.usuarios);

    if (respuesta) {
      console.log("Usuario creado");
    } else {
      console.log("Hubo un error");
    }
  }

  getUser() {
    console.log(this.usuarios);
  }
}

class Usuario {
  constructor(nombre, apellido, edad, curso) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.curso = curso;
  }
}

const usr1 = new Usuario("mario", "campos", 57, "1");
const usr2 = new Usuario("cesar", "campos", 57, "1");
const usr3 = new Usuario("fernando", "campos", 57, "1");
const usr4 = new Usuario("claudia", "campos", 57, "1");

const name = "./usuarios.json";
const usuarioControlador = new managerUser(name);

usuarioControlador.createUser(usr1);
usuarioControlador.createUser(usr2);
usuarioControlador.createUser(usr3);
usuarioControlador.createUser(usr4);

usuarioControlador.getUser();
