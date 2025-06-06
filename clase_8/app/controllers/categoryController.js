import { Category } from '../models/index.js'; // Asegúrate de exportar Category correctamente
import { Op } from 'sequelize';

// Obtener todas las categorías
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({
      success: true,
      data: categories,
      message: 'Categorías obtenidas correctamente',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener categorías',
      error: error.message,
    });
  }
};

// Obtener una categoría por ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada',
      });
    }
    res.status(200).json({
      success: true,
      data: category,
      message: 'Categoría encontrada',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la categoría',
      error: error.message,
    });
  }
};

// Crear una nueva categoría
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'El nombre de la categoría es obligatorio',
      });
    }

    // Verificar si ya existe
    const exists = await Category.findOne({ where: { name: { [Op.eq]: name.trim() } } });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: 'La categoría ya existe',
      });
    }

    const category = await Category.create({ name: name.trim() });
    res.status(201).json({
      success: true,
      data: category,
      message: 'Categoría creada correctamente',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear la categoría',
      error: error.message,
    });
  }
};

// Actualizar una categoría
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada',
      });
    }

    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'El nombre de la categoría es obligatorio',
      });
    }

    category.name = name.trim();
    await category.save();

    res.status(200).json({
      success: true,
      data: category,
      message: 'Categoría actualizada correctamente',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la categoría',
      error: error.message,
    });
  }
};

// Eliminar una categoría
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada',
      });
    }

    await category.destroy();

    res.status(200).json({
      success: true,
      message: 'Categoría eliminada correctamente',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la categoría',
      error: error.message,
    });
  }
};
