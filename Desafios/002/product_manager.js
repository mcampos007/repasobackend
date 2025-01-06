import fs from "fs";

class ProductManager {
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
    return product || { error: "Not found" };
  }

  //Metodo para actualizar un prod
  async updateProduct(product) {
    try {
      const index = this.products.findIndex((p) => p.id === product.id);
      if (index === -1) {
        return { error: "Not found" };
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

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

//  ***********************      Testing                  **************//
const path = "./";
const pM = new ProductManager(path);

let p1 = new Product(
  "Titulo del Producto 1",
  "Descripción del producto 1",
  1000,
  "img002.jpg",
  "p-0001",
  100
);
let p2 = new Product(
  "Titulo del Producto 2",
  "Descripción del producto 2",
  1000,
  "img002.jpg",
  "p-0002",
  100
);
let p3 = new Product(
  "Titulo del Producto 3",
  "Descripción del producto 3",
  1000,
  "img003.jpg",
  "p-0003",
  100
);

console.log("Agregar un producto");
const r1 = pM.addProduct(p1);
// const r2 = pM.addProduct(p2);
// const r3 = pM.addProduct(p3);

console.log("Recuperar todos los productos");
let rs;
rs = await pM.getProducts();

console.log(rs);

console.log("Recuperar Producto por ID");
rs = await pM.getProductById(1);
console.log(rs);

//Tsting del metodo updateProduct
console.log("Actualizar Producto");
p1.id = 1;
p1.price = 2000;
rs = await pM.updateProduct(p1);

//Testing para eliminar un producto
console.log("Eliminar Producto");
rs = await pM.deleteProduct(7);
//Verificar que el json exista
// // const result = pM.fileExist();
// // console.log(result);

// console.log(pM);
// console.log(p);

// const productManager = new ProductManager();
// let result;
// //Agregar un prducto nuevo
// result = productManager.addProduct(
//   new Product(
//     "Titulo del producto",
//     "Descripcion del producto",
//     123.45,
//     "img001",
//     "p-0001",
//     100
//   )
// );

// console.log(2, `Resultado: ${result}`);

// //Agregar un segunfo prducto nuevo
// result = productManager.addProduct(
//   new Product(
//     "Titulo del producto 2",
//     "Descripcion del producto 2",
//     123.45,
//     "img002",
//     "p-0002",
//     100
//   )
// );

// console.log(3, `Resultado: ${result}`);

// //Agregar un prducto con code existente
// result = productManager.addProduct(
//   new Product(
//     "Titulo del producto 2",
//     "Descripcion del producto 2",
//     123.45,
//     "img002",
//     "p-0002",
//     100
//   )
// );

// console.log(4, `Resultado: ${result}`);

// //Agregar un prducto con datos faltantes
// result = productManager.addProduct(new Product("Titulo del producto x"));

// console.log(5, `Resultado: ${result}`);

// //Listado de Productos existentes
// console.log(6, "La Lista de Productos actual es");
// console.log(7, productManager.getProducts());

// //Recuperar un producto con id = 1
// console.log(8, productManager.getProductById(1));

// //Recuperar un producto con id = 3
// console.log(8, productManager.getProductById(3));
