import express from 'express';
import {
  getPrograms,
  getProgramBySlugOrId,
  createProgram,
  updateProgram,
  deleteProgram,
} from '../controllers/programController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPrograms);
router.get('/:slugOrId', getProgramBySlugOrId);
router.post('/', protect, createProgram);
router.put('/:id', protect, updateProgram);
router.delete('/:id', protect, deleteProgram);

export default router;
