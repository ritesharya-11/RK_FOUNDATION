import express from 'express';
import {
  getProjects,
  getProjectBySlugOrId,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProjects);
router.get('/:slugOrId', getProjectBySlugOrId);
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

export default router;
