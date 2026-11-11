import express from 'express';
import { uploadImage, getImageKitAuth } from '../controllers/uploadController.js';
import { protect } from '../middleware/auth.js';
import { uploadSingleImage } from '../middleware/upload.js';

const router = express.Router();

router.post('/', protect, uploadSingleImage.single('image'), uploadImage);
router.get('/imagekit-auth', protect, getImageKitAuth);

export default router;
