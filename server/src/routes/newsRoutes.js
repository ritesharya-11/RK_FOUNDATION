import express from 'express';
import {
  getNews,
  getNewsBySlugOrId,
  createNews,
  updateNews,
  deleteNews,
} from '../controllers/newsController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getNews);
router.get('/:slugOrId', getNewsBySlugOrId);
router.post('/', protect, createNews);
router.put('/:id', protect, updateNews);
router.delete('/:id', protect, deleteNews);

export default router;
