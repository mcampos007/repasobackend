import fs from "fs";

class ManagerUsers {
  constructor(path) {
    this.path = path;
  }

  async getUsers() {
    try {
      if (fs.existsSync(this.path)) {
        const users = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(users);
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createUsers(user) {
    try {
      const users = await this.getUsers();
      users.push(user);
      await fs.promises.writeFile(this.path, JSON.stringify(users));
    } catch (error) {
      console.log(error);
    }
  }
}

const manager = new ManagerUsers("users.json");
const user1 = {
  first_name: "Mario",
  last_name: "Campos",
  age: 55,
};

const user2 = {
  first_name: "cesar",
  last_name: "Campos",
  age: 25,
};

const test = async () => {
  console.log(await manager.getUsers());
  await manager.createUsers(user1);
  await manager.createUsers(user2);
  console.log(await manager.getUsers());
};

test();
