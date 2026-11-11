import express from 'express';
import {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
} from '../controllers/activityController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getActivities);
router.get('/:id', getActivityById);
router.post('/', protect, createActivity);
router.put('/:id', protect, updateActivity);
router.delete('/:id', protect, deleteActivity);

export default router;
