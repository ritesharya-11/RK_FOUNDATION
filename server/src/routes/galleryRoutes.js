import express from 'express';
import {
  getGallery,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from '../controllers/galleryController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getGallery);
router.post('/', protect, addGalleryItem);
router.put('/:id', protect, updateGalleryItem);
router.delete('/:id', protect, deleteGalleryItem);

export default router;
