import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUsers,
  changeUserStatus,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/search', searchUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.put('/:id/status', changeUserStatus);

export default router;
