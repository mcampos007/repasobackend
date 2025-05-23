import fs from "fs";
import crypto from "crypto";

class UserManager {
  constructor(path) {
    this.path = path;
  }

  async getUsers() {
    if (fs.existsSync(this.path)) {
      const usersFile = await fs.promises.readFile(this.path, "utf-8");
      const users = JSON.parse(usersFile);
      return users;
    }
    return [];
  }

  async createUser(user) {
    const usersFile = await this.getUsers();
    const userExist = usersFile.find((usr) => user.username === usr.username);

    if (userExist) return "El usuario ya existe";

    user.salt = crypto.randomBytes(128).toString();
    user.password = crypto
      .createHmac("sha256", user.salt)
      .update(user.password)
      .digest("hex");
    usersFile.push(user);
    await fs.promises.writeFile(this.path, JSON.stringify(usersFile));
  }

  async validateUser(username, password) {
    const usersFile = await this.getUsers();
    const user = usersFile.find((user) => user.username === username);

    if (!user) {
      return "User or password incorrect";
    }
    const nuevaCrypto = crypto
      .createHmac("sha256", user.salt)
      .update(password)
      .digest("hex");
    if (user.password === nuevaCrypto) {
      return "Login OK";
    } else {
      return "User or Password incorrect";
    }
  }
}

const manager = new UserManager("./User.json");

const user1 = {
  firstname: "mario",
  lastname: "Campos",
  username: "mcampos",
  password: "1234",
};

const user2 = {
  firstname: "cesar",
  lastname: "Campos",
  username: "ccampos",
  password: "12345",
};

const test = async () => {
  await manager.createUser(user1);
  console.log(await manager.createUser(user2));
  //Creación de los usuarios
  console.log(await manager.getUsers());

  console.log(1, await manager.validateUser("mario", "4321"));
  console.log(2, await manager.validateUser("mario", "1234"));
  console.log(3, await manager.validateUser("mcampos", "1234"));
};

test();
