import Activity from '../models/Activity.js';

// @desc    Get all activities
// @route   GET /api/activities
// @access  Public
export const getActivities = async (req, res, next) => {
  try {
    const { category, status } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }
    if (status) {
      query.status = status;
    }

    const activities = await Activity.find(query).sort({ date: -1 });
    res.status(200).json({ success: true, count: activities.length, activities });
  } catch (err) {
    next(err);
  }
};

// @desc    Get activity by ID
// @route   GET /api/activities/:id
// @access  Public
export const getActivityById = async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity record not found.' });
    }
    res.status(200).json({ success: true, activity });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new activity
// @route   POST /api/activities
// @access  Private (Admin)
export const createActivity = async (req, res, next) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Activity drive created successfully.',
      activity,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update activity
// @route   PUT /api/activities/:id
// @access  Private (Admin)
export const updateActivity = async (req, res, next) => {
  try {
    let activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found.' });
    }

    activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Activity updated successfully.',
      activity,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete activity
// @route   DELETE /api/activities/:id
// @access  Private (Admin)
export const deleteActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found.' });
    }

    await Activity.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Activity deleted successfully.' });
  } catch (err) {
    next(err);
  }
};
