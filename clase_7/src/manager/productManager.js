import fs from "fs";
import { v4 as uuidv4 } from "uuid";
export default class productManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (!fs.existsSync(this.path)) {
        return [];
      } else {
        const products = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(products);
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getProductById(id) {
    try {
      const products = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      const findProduct = products.filter((p) => p.id === id);
      if (findProduct.length === 0) {
        throw new Error(`Producto con ID ${id} no encontrado.`);
      }
      return findProduct;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async addProduct(obj) {
    try {
      const products = await this.getProducts();

      // Calcular el siguiente ID correctamente
      const product = {
        id: uuidv4(),
        ...obj,
      };
      const exists = products.some((p) => p.code === obj.code);
      if (exists) {
        throw new Error(`El producto con el código ${obj.code} ya existe.`);
      }
      if (!obj.title) {
        throw new Error("El título es obligatorio.");
      }
      if (!obj.description) {
        throw new Error("La descripción es obligatoria.");
      }
      if (!obj.price) {
        throw new Error("El precio es obligatorio.");
      }
      if (!obj.thumbnail) {
        throw new Error("La imagen es obligatoria.");
      }
      if (!obj.stock) {
        throw new Error("El stock es obligatorio.");
      }
      if (!obj.code) {
        throw new Error("El código es obligatorio.");
      }
      if (!obj.status) {
        throw new Error("El estado es obligatorio.");
      }

      products.push(product);
      const respuesta = await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
      return {
        success: true,
        message: "Producto agregado correctamente.",
        product,
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  //updateProduct
  async updateproduct(id, obj) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex((p) => p.id === id);

      if (productIndex === -1) {
        throw new Error(`Producto con ID ${id} no encontrado.`);
      }

      const updatedProduct = {
        ...products[productIndex],
        ...obj,
      };
      products[productIndex] = updatedProduct;
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );

      return {
        success: true,
        message: "Producto actualizado correctamente.",
        updatedProduct,
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deleteProduct(id) {
    try {
      const products = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      const newProducts = products.filter((p) => p.id !== id);
      if (products.length === newProducts.length) {
        throw new Error(`Producto con ID ${id} no encontrado.`);
      }
      await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
      return {
        success: true,
        message: `Producto con ID ${id} eliminado correctamente.`,
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deleteFileProduct() {
    try {
      await fs.promises.unlink(this.path);
      return {
        success: true,
        message: "Archivo de productos eliminado correctamente.",
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
