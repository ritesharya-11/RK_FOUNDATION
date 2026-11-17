import fs from 'fs';
import {
  isImageKitConfigured,
  uploadToImageKit,
  getClientAuthParams,
} from '../services/imagekitService.js';

// @desc    Upload Single Image (Supports ImageKit Cloud CDN with Local Fallback)
// @route   POST /api/upload
// @access  Private (Admin)
export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file uploaded.',
      });
    }

    // Check if ImageKit is configured in environment variables
    if (isImageKitConfigured()) {
      try {
        const fileBuffer = fs.readFileSync(req.file.path);
        const ikResult = await uploadToImageKit(fileBuffer, req.file.filename, '/rk-foundation');

        // Clean up temporary local file once uploaded to cloud
        try {
          fs.unlinkSync(req.file.path);
        } catch (cleanupErr) {
          // ignore cleanup error
        }

        return res.status(200).json({
          success: true,
          message: 'Image uploaded to ImageKit Cloud CDN successfully.',
          url: ikResult.url,
          imageUrl: ikResult.url,
          thumbnailUrl: ikResult.thumbnailUrl,
          fileId: ikResult.fileId,
          provider: 'imagekit',
        });
      } catch (ikErr) {
        console.warn('[ImageKit Upload Warning] Cloud upload failed, falling back to local storage:', ikErr.message);
      }
    }

    // Local Storage Fallback URL (Provide both relative and absolute for proxy compatibility)
    const host = req.get('host');
    const protocol = req.protocol;
    const relativeUrl = `/uploads/${req.file.filename}`;
    const absoluteUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

    res.status(200).json({
      success: true,
      message: 'Image uploaded to local storage.',
      url: relativeUrl,
      imageUrl: relativeUrl,
      fullUrl: absoluteUrl,
      fileName: req.file.filename,
      provider: 'local',
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get ImageKit Authentication Parameters for Direct Client Uploads
// @route   GET /api/upload/imagekit-auth
// @access  Private (Admin)
export const getImageKitAuth = (req, res, next) => {
  try {
    if (!isImageKitConfigured()) {
      return res.status(400).json({
        success: false,
        message: 'ImageKit credentials are not configured in server/.env',
      });
    }

    const authParams = getClientAuthParams();
    res.status(200).json({
      success: true,
      ...authParams,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });
  } catch (err) {
    next(err);
  }
};
