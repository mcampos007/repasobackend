import { Product } from '../models/index.js';

// Obtener todos los productos con categoría
import { Category } from '../models/index.js';

export const getAllProducts = async (req, res) => {
  try {
    let products = await Product.findAll({
      include: {
        model: Category,
        as: 'category',
        attributes: ['name'], // Solo el nombre de la categoría
      },
    });
    const { limit } = req.query;
    if (limit) {
      const limitNumber = parseInt(limit);
      if (isNaN(limitNumber)) {
        return res.status(400).json({ error: 'Limit must be a number' });
      }
      products = products.slice(0, limitNumber);
    }
    res.status(200).json({
      success: true,
      data: products,
      message: 'Productos obtenidos correctamente',
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res
      .status(500)
      .json({ success: false, message: 'Error al Recuperar los productos', error: error.message });
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
//Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const { Product } = req.context.models;
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await product.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};
// Actualizar un producto
export const updateProduct = async (req, res) => {
  try {
    const { Product } = req.context.models;
    const { id } = req.params;
    const { name, description, price, image } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (image) product.image = image;

    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};
//Exportar productos por Categoria
export const getProductsByCategory = async (req, res) => {
  try {
    const { category_id } = req.params;
    console.log('Category ID:', category_id);

    const products = await Product.findAll({
      where: { category_id },
      include: {
        model: Category,
        as: 'category',
        attributes: ['name'], // Solo el nombre de la categoría
      },
    });

    if (products.length === 0) {
      return res.status(404).json({ error: 'No se encontraron productos para esta categoría' });
    }

    res.status(200).json({
      success: true,
      data: products,
      message: 'Productos obtenidos correctamente',
    });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los productos por categoría',
      error: error.message,
    });
  }
};
