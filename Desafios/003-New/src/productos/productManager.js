import fs from "fs";

export class ProductManager {
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

  async addProduct(product) {
    try {
      const products = await this.getProducts();

      // Calcular el siguiente ID correctamente
      const newId =
        products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

      product.id = newId;

      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
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

// const managerProducts = new ProductManager("src/data/products.json");
// const product1 = {
//   title: "Product 1",
//   description: "Descripcion del producto 1",
//   price: 1000,
//   thumbnail: "img001",
//   code: "p-0001",
//   stock: 500,
// };

// const product2 = {
//   title: "Product 2",
//   description: "Descripcion del producto 2",
//   price: 2000,
//   thumbnail: "img002",
//   code: "p-0002",
//   stock: 1000,
// };

// const product3 = {
//   title: "Product 3",
//   description: "Descripcion del producto 3",
//   price: 3000,
//   thumbnail: "img003",
//   code: "p-0003",
//   stock: 1500,
// };
// const test = async () => {
//   console.log(await managerProducts.deleteFileProduct());
//   console.log(await managerProducts.getProducts());
//   console.log(await managerProducts.addProduct(product1));
//   console.log(await managerProducts.addProduct(product2));
//   console.log(await managerProducts.addProduct(product3));
//   console.log(await managerProducts.getProducts());
//   console.log(await managerProducts.getProductById(2));
//   console.log(await managerProducts.getProductById(22)); //Producto inexistente
//   console.log(await managerProducts.deleteProduct(2));
//   console.log(await managerProducts.deleteProduct(22)); //Producto inexistente
// };

// test();
