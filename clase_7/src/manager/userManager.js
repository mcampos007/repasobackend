import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class userManager {
  constructor(path) {
    this.path = path;
  }

  async getUsers() {
    try {
      if (!fs.existsSync(this.path)) {
        return [];
      } else {
        const usuarios = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(usuarios);
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getUserById(id) {
    try {
      const usuarios = await this.getUsers();
      const usuario = usuarios.find((u) => u.id === id);
      if (!usuario) {
        return { success: false, message: "Usuario no encontrado" };
      }
      return { success: true, usuario };
    } catch {
      return { success: false, error: error.message };
    }
  }

  async createUser(objeto) {
    try {
      const usuarios = await this.getUsers();
      const usuario = {
        id: uuidv4(),
        ...objeto,
      };
      const existe = usuarios.some((u) => u.nombre === objeto.nombre);
      if (existe) {
        return { success: false, message: "El usuario ya existe" };
      }
      if (usuario.nombre === undefined) {
        return { success: false, message: "El nombre es obligatorio" };
      }
      if (usuario.apellido === undefined) {
        return { success: false, message: "El apellido es obligatorio" };
      }
      if (usuario.edad === undefined) {
        return { success: false, message: "La edad es obligatoria" };
      }
      if (usuario.curso === undefined) {
        return { success: false, message: "El curso es obligatorio" };
      }
      if (usuario.nombre.length < 3) {
        return {
          success: false,
          message: "El nombre debe tener al menos 3 caracteres",
        };
      }

      usuarios.push(usuario);
      const respuesta = await fs.promises.writeFile(
        this.path,
        JSON.stringify(usuarios, null, "\t")
      );
      console.log(1, respuesta);
      if (!respuesta) {
        return {
          success: true,
          message: "Usuario creado correctamente",
          usuario,
        };
      } else {
        return { success: false, message: "Error al crear el usuario" };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateuser(id, obj) {
    try {
      const usuarios = await this.getUsers();
      const index = usuarios.findIndex((u) => u.id === id);
      if (index === -1) {
        // return { success: false, message: "Usuario no encontrado" };
        return false;
      }
      const usuarioActualizado = { ...usuarios[index], ...obj };
      usuarios[index] = usuarioActualizado;
      const respuesta = await fs.promises.writeFile(
        this.path,
        JSON.stringify(usuarios)
      );
      if (respuesta) {
        return false;
      }
      return usuarioActualizado;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deleteUser(id) {
    try {
      const usuarios = await this.getUsers();
      const index = usuarios.findIndex((u) => u.id === id);
      if (index === -1) {
        return { success: false, message: "Usuario no encontrado" };
      }
      usuarios.splice(index, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(usuarios));
      return { success: true, message: "Usuario eliminado correctamente" };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // class Usuario {
  //   constructor(nombre, apellido, edad, curso) {
  //     this.nombre = nombre;
  //     this.apellido = apellido;
  //     this.edad = edad;
  //     this.curso = curso;
  //   }
}
