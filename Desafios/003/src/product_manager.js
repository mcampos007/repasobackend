import fs from "fs";

export class ProductManager {
  constructor(path) {
    this.path = path;
    this.fileName = "products.json";

    if (!fs.existsSync(this.path + this.fileName)) {
      this.products = [];
    } else {
      try {
        const p = fs.readFileSync(this.path + this.fileName, "utf-8");
        this.products = JSON.parse(p);
      } catch (error) {
        this.products = [];
      }
    }
  }

  // Determinar Id para el nuevo producto
  productId(products) {
    if (products.length === 0) {
      return 1;
    }
    return products[products.length - 1].id + 1;
  }

  //Metodo para agregar un producto al arreglo principal
  async addProduct(product) {
    try {
      // Crear una copia independiente del producto

      const newProduct = { ...product };

      // Agrego el id del producto
      newProduct.id = this.productId(this.products);
      //console.log(`Id del producto: ${newProduct.id}`);
      this.products.push(newProduct);
      //console.log(this.products);

      //Guardar el json
      await fs.promises.writeFile(
        this.path + this.fileName,
        JSON.stringify(this.products, null, "\t")
      );
    } catch (error) {
      console.log(error);
    }
  }

  // Verificar que el archivo exista
  fileExist(name) {
    return fs.existsSync(this.path + this.fileName);
  }
  // Método para verificar si un código ya existe
  isDuplicateCode(code) {
    return this.products.some((p) => p.code === code);
  }

  // Metodo para vaslidar campos obligatorios
  validateProduct(product) {
    const requiredFields = [
      "title",
      "description",
      "price",
      "thumbnail",
      "code",
      "stock",
    ];
    let msg = "";
    for (const field of requiredFields) {
      if (!product[field] && product[field] !== 0) {
        msg += `el campo ${field} es requerido y no puede estar vacío .\n`;
      }
    }
    if (msg) {
      return msg;
    }

    return null;
  }
  //Metodo para recuperar todos los producto registrados
  async getProducts() {
    try {
      const result = await fs.promises.readFile(
        this.path + this.fileName,
        "utf-8"
      );
      // console.log(result);
      return result;
    } catch (error) {
      return { error: "Not products found" };
    }
  }

  // REcuperar un Producto a partir de su id
  getProductById(id) {
    const product = this.products.find((prod) => prod.id === id);
    return product || { error: "Product Not found" };
  }

  //Metodo para actualizar un prod
  async updateProduct(product) {
    try {
      const index = this.products.findIndex((p) => p.id === product.id);
      if (index === -1) {
        return { error: "Product Not found" };
      }
      this.products[index] = product;
      await fs.promises.writeFile(
        this.path + this.fileName,
        JSON.stringify(this.products, null, "\t")
      );
      return product;
    } catch (error) {
      return { error: "Not found" };
    }
  }

  //metodo para eliminar un producto  a partir de su id
  async deleteProduct(id) {
    try {
      const index = this.products.findIndex((p) => p.id === id);
      if (index === -1) {
        return { error: "Not found" };
      }
      this.products.splice(index, 1);
      await fs.promises.writeFile(
        this.path + this.fileName,
        JSON.stringify(this.products, null, "\t")
      );
      return { success: true };
    } catch (error) {
      return { error: "Not found" };
    }
  }
}

export class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}
