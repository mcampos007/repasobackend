import fs from "fs";
import crypto from "crypto";

class userManager {
  constructor(path) {
    try {
      this.path = path;
      let users = fs.readFileSync(this.path, "utf-8");
      this.users = JSON.parse(users);
    } catch {
      this.users = [];
    }
  }

  async addUser(user) {
    const hashPassword = crypto
      .createHash("sha256")
      .update(user.password)
      .digest("hex");
    user.password = hashPassword;
    this.users.push(user);

    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.users, null, "\t")
      );
      console.log("Usuario agregado correctamente");
    } catch (error) {
      console.log("Error al agregar usuario ", error);
    }
  }

  validarUsuario(username, password) {
    const userExists = this.users.find((user) => user.username === username);
    if (!userExists) {
      console.log("Usuario no existe");
      return false;
    }

    const hashPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    if (userExists.password === hashPassword) {
      console.log("Usuario validado correctamente");
      return true;
    }
    console.log("Contraseña incorrecta");
    return false;
  }

  getUser(username) {
    return this.users.find((user) => user.username === username);
  }

  removeUser(username) {
    this.users = this.users.filter((user) => user.username !== username);
  }

  getUsers() {
    return this.users;
  }
}

class user {
  constructor(nombre, apellido, username, password) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.username = username;
    this.password = password;
  }
}

// test crear 5 usuarios
const newuser = new userManager("./users.json");
// const user1 = new user("Juan", "Perez", "juanperez", "123");
// const user2 = new user("Pedro", "Gomez", "pedrogomez", "123");
// const user3 = new user("Maria", "Gonzalez", "mariagonzalez", "123");
// const user4 = new user("Jose", "Lopez", "joselopez", "123");
// const user5 = new user("Ana", "Martinez", "anamartinez", "123");

// newuser.addUser(user1);
// newuser.addUser(user2);
// newuser.addUser(user3);
// newuser.addUser(user4);
// newuser.addUser(user5);

// test validar usuario
newuser.validarUsuario("juanperez", "123");
newuser.validarUsuario("juanperez", "1234");
