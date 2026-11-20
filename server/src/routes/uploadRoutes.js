import express from 'express';
import { uploadImage, getImageKitAuth } from '../controllers/uploadController.js';
import { protect } from '../middleware/auth.js';
import { uploadSingleImage } from '../middleware/upload.js';

const router = express.Router();

const handleUploadMiddleware = (req, res, next) => {
  uploadSingleImage.single('image')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        const maxMb = process.env.MAX_FILE_SIZE_MB || 20;
        return res.status(400).json({
          success: false,
          message: `The uploaded image exceeds the maximum allowed file size of ${maxMb}MB.`,
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || 'Image upload failed. Please ensure the file is a valid image.',
      });
    }
    next();
  });
};

router.post('/', protect, handleUploadMiddleware, uploadImage);
router.get('/imagekit-auth', protect, getImageKitAuth);

export default router;
