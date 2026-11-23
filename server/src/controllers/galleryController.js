import Gallery from '../models/Gallery.js';

const BROKEN_PATTERNS = [
  'rct-ground-',
  'protective mask distribution',
  'elderly health support',
  'on-ground hand sanitization',
  'dignified clothing',
  'dry ration & nutritional staple',
  'community protective gear',
  'community hand hygiene',
  'direct assistance for differently-abled',
  'apparel & festive clothing',
  'orderly beneficiary queue',
  'rebirth care trust ground volunteer',
  'warm cloth & winter essential',
  'comprehensive textile',
  'dignity kit presentation',
  'mask distribution & contactless sanitizer',
];

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

    const rawItems = await Gallery.find(query).sort({ eventDate: -1, createdAt: -1 });
    const items = rawItems.filter((i) => {
      const t = String(i.title || '').toLowerCase();
      const u = String(i.imageUrl || '').toLowerCase();
      return !BROKEN_PATTERNS.some((p) => t.includes(p) || u.includes(p));
    });
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
