import express from 'express';
import {
  login,
  getMe,
  updateProfile,
  changePassword,
  getAllAdmins,
  createAdmin,
  deleteAdmin,
} from '../controllers/authController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

// Super Admin restricted user management
router.get('/users', protect, authorize('superadmin'), getAllAdmins);
router.post('/users', protect, authorize('superadmin'), createAdmin);
router.delete('/users/:id', protect, authorize('superadmin'), deleteAdmin);

export default router;
