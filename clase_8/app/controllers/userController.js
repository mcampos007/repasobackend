import bcrypt from 'bcrypt';
import { User } from '../models/index.js'; // Asegúrate de exportar User correctamente
import { Op } from 'sequelize';

//Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      success: true,
      data: users,
      message: 'Usuarios obtenidos correctamente',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuarios',
      error: error.message,
    });
  }
};
// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }
    res.status(200).json({
      success: true,
      data: user,
      message: 'Usuario encontrado',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el usuario',
      error: error.message,
    });
  }
};
// Crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    const { username, password, email, role, status } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: 'El nombre de usuario, contraseña y correo electrónico son obligatorios',
      });
    }

    // Verificar si ya existe
    const exists = await User.findOne({ where: { username: { [Op.eq]: username.trim() } } });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'El nombre de usuario ya está en uso',
      });
    }
    // Hashear el password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 es el "salt rounds"

    const newUser = await User.create({
      username: username.trim(),
      password: hashedPassword,
      email: email.trim(),
      role: role || 'user',
      status: status || 'active',
    });

    res.status(201).json({
      success: true,
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
      },
      message: 'Usuario creado correctamente',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear el usuario',
      error: error.message,
    });
  }
};
// Actualizar un usuario
export const updateUser = async (req, res) => {
  try {
    const { username, password, email, role, status } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: 'El nombre de usuario, contraseña y correo electrónico son obligatorios',
      });
    }

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }
    // Hashear el password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 es el "salt rounds"

    // Actualizar los campos
    user.username = username.trim();
    user.password = hashedPassword;
    user.email = email.trim();
    user.role = role || user.role;
    user.status = status || user.status;

    await user.save();

    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      },
      message: 'Usuario actualizado correctamente',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el usuario',
      error: error.message,
    });
  }
};
// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    await user.destroy();

    res.status(200).json({
      success: true,
      message: 'Usuario eliminado correctamente',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el usuario',
      error: error.message,
    });
  }
};
// Buscar usuarios por nombre de usuario
export const searchUsers = async (req, res) => {
  console.log('Buscando usuarios por nombre de usuario:', req.query.username);

  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: 'El nombre de usuario es obligatorio para la búsqueda',
      });
    }

    const users = await User.findAll({
      where: {
        username: {
          [Op.like]: `%${username.trim()}%`,
        },
      },
    });

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron usuarios con ese nombre',
      });
    }

    res.status(200).json({
      success: true,
      data: users,
      message: 'Usuarios encontrados',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al buscar usuarios',
      error: error.message,
    });
  }
};
// cambiar el estado de un usuario
export const changeUserStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || (status !== 'active' && status !== 'inactive')) {
      return res.status(400).json({
        success: false,
        message: 'El estado debe ser "active" o "inactive"',
      });
    }

    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    user.status = status;
    await user.save();

    res.status(200).json({
      success: true,
      data: user,
      message: `Estado del usuario cambiado a ${status}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cambiar el estado del usuario',
      error: error.message,
    });
  }
};
// Exportar todas las funciones del controlador
export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUsers,
  changeUserStatus,
};
