//import Product from "../models/product.js";

export const getAllProducts = async (req, res) => {
  try {
    const { Product } = req.context.models;
    let products = await Product.findAll();
    const { limit } = req.query;
    if (limit) {
      const limitNumber = parseInt(limit);
      if (isNaN(limitNumber)) {
        return res.status(400).json({ error: 'Limit must be a number' });
      }
      products = products.slice(0, limitNumber);
    }
    res.json(products);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

//REgistrar nuevos productos
export const createProduct = async (req, res) => {
  try {
    const { Product } = req.context.models;
    const { name, description, price, image } = req.body;
    

    if (!name || !description || !price || !image) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const product = await Product.create({ name, description, price, image });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};
//Get Product by ID
export const getProductById = async (req, res) => {
  try {
    const { Product } = req.context.models;
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};
/* export const getAllProducts = async (req, res) => {
  
  const {limit} = req.query;
  
  try {
    let products;
  
    if (limit) {
      const limitNumber = parseInt(limit);
      if (isNaN(limitNumber)) {
        return res.status(400).json({ error: "Limit must be a number" });
      }
      products = await Product.findAll({
        limit: limitNumber,
        order: [['id', 'ASC']]
      });
    }else {
      products = await Product.findAll({
        order: [['id', 'ASC']]
      });
    }
    
    res.json(products);
}catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
 */