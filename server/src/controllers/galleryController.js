import Gallery from '../models/Gallery.js';

// @desc    Get all gallery photos
// @route   GET /api/gallery
// @access  Public
export const getGallery = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }
    if (featured === 'true') {
      query.isFeatured = true;
    }

    const items = await Gallery.find(query).sort({ eventDate: -1, createdAt: -1 });
    res.status(200).json({ success: true, count: items.length, items });
  } catch (err) {
    next(err);
  }
};

// @desc    Add photo to gallery
// @route   POST /api/gallery
// @access  Private (Admin)
export const addGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Photo added to gallery successfully.',
      item,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update gallery photo
// @route   PUT /api/gallery/:id
// @access  Private (Admin)
export const updateGalleryItem = async (req, res, next) => {
  try {
    let item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found.' });
    }

    item = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Gallery item updated successfully.',
      item,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete gallery photo
// @route   DELETE /api/gallery/:id
// @access  Private (Admin)
export const deleteGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found.' });
    }

    await Gallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Gallery photo removed successfully.' });
  } catch (err) {
    next(err);
  }
};
