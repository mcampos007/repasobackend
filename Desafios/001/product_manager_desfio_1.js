class ProductManager {
  constructor() {
    this.currentId = 1;
    this.products = [];
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
  //Metodo para agregar un producto al arreglo principal
  addProduct(product) {
    console.log(
      1,
      `Agregar el producto al arreglo princial: ${Object.entries(product)}`
    );

    const validateError = this.validateProduct(product);
    if (validateError) {
      return validateError;
    }

    if (this.isDuplicateCode(product.code)) {
      return "El codigo de producto ya existe y no se permiten dulicados";
    }

    // Agrgar Id
    product.id = this.currentId;
    this.currentId++;

    this.products.push(product);
    return "Producto Agregado Exitosamente";
  }

  //Metodo para recuperar todos los producto registrados
  getProducts() {
    return this.products;
  }

  // REcuperar un Producto a partir de su id
  getProductById(id) {
    const product = this.products.find((prod) => prod.id === id);

    return product || { error: "Not found" };
  }
}

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    (this.title = title),
      (this.description = description),
      (this.price = price),
      (this.thumbnail = thumbnail),
      (this.code = code),
      (this.stock = stock);
  }
}

//  ***********************      Testing                  **************//
const productManager = new ProductManager();
let result;
//Agregar un prducto nuevo
result = productManager.addProduct(
  new Product(
    "Titulo del producto",
    "Descripcion del producto",
    123.45,
    "img001",
    "p-0001",
    100
  )
);

console.log(2, `Resultado: ${result}`);

//Agregar un segunfo prducto nuevo
result = productManager.addProduct(
  new Product(
    "Titulo del producto 2",
    "Descripcion del producto 2",
    123.45,
    "img002",
    "p-0002",
    100
  )
);

console.log(3, `Resultado: ${result}`);

//Agregar un prducto con code existente
result = productManager.addProduct(
  new Product(
    "Titulo del producto 2",
    "Descripcion del producto 2",
    123.45,
    "img002",
    "p-0002",
    100
  )
);

console.log(4, `Resultado: ${result}`);

//Agregar un prducto con datos faltantes
result = productManager.addProduct(new Product("Titulo del producto x"));

console.log(5, `Resultado: ${result}`);

//Listado de Productos existentes
console.log(6, "La Lista de Productos actual es");
console.log(7, productManager.getProducts());

//Recuperar un producto con id = 1
console.log(8, productManager.getProductById(1));

//Recuperar un producto con id = 3
console.log(8, productManager.getProductById(3));
