import mongoose from 'mongoose';
import Setting from '../models/Setting.js';

const sanitizeSubdocumentIds = (items) => {
  if (!Array.isArray(items)) return items;
  return items.map((item) => {
    if (!item || typeof item !== 'object') return item;
    const clean = { ...item };
    if (clean._id && !mongoose.Types.ObjectId.isValid(clean._id)) {
      clean._id = new mongoose.Types.ObjectId().toString();
    }
    return clean;
  });
};

// @desc    Get website public settings
// @route   GET /api/settings
// @access  Public
export const getPublicSettings = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({});
    }
    res.status(200).json({ success: true, settings });
  } catch (err) {
    next(err);
  }
};

// @desc    Update website settings
// @route   PUT /api/settings
// @access  Private (Admin)
export const updateSettings = async (req, res, next) => {
  try {
    const payload = { ...req.body };

    // Sanitize any subdocument array IDs that could fail BSON ObjectId casting
    if (Array.isArray(payload.heroBanners)) {
      payload.heroBanners = sanitizeSubdocumentIds(payload.heroBanners);
    }
    if (Array.isArray(payload.parentsVideos)) {
      payload.parentsVideos = sanitizeSubdocumentIds(payload.parentsVideos);
    }
    if (Array.isArray(payload.appreciationLetters)) {
      payload.appreciationLetters = sanitizeSubdocumentIds(payload.appreciationLetters);
    }
    if (Array.isArray(payload.impactStories)) {
      payload.impactStories = sanitizeSubdocumentIds(payload.impactStories);
    }

    let settings = await Setting.findOne();
    if (!settings) {
      settings = new Setting(payload);
    } else {
      // Merge updates
      Object.assign(settings, payload);
    }

    const updated = await settings.save();
    res.status(200).json({
      success: true,
      message: 'Website settings updated successfully.',
      settings: updated,
    });
  } catch (err) {
    next(err);
  }
};
