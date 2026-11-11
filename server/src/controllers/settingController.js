import Setting from '../models/Setting.js';

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
    let settings = await Setting.findOne();
    if (!settings) {
      settings = new Setting(req.body);
    } else {
      // Merge updates
      Object.assign(settings, req.body);
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
