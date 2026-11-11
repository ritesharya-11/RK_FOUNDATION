import Volunteer from '../models/Volunteer.js';

// @desc    Submit Volunteer Application
// @route   POST /api/volunteers
// @access  Public
export const submitVolunteer = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phone,
      city,
      state,
      occupation,
      education,
      availableHoursPerWeek,
      areasOfInterest,
      previousExperience,
      motivation,
    } = req.body;

    if (!fullName || !email || !phone || !motivation) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, email, phone number, and motivation.',
      });
    }

    const application = await Volunteer.create({
      fullName,
      email,
      phone,
      city: city || 'Delhi-NCR',
      state: state || 'Delhi',
      occupation: occupation || 'Student / Professional',
      education: education || '',
      availableHoursPerWeek: availableHoursPerWeek || 'Weekends only',
      areasOfInterest: areasOfInterest || ['Child Tutoring & Education'],
      previousExperience: previousExperience || '',
      motivation,
    });

    res.status(201).json({
      success: true,
      message:
        'Thank you for volunteering! Your application has been received. Our volunteer coordinator will contact you shortly.',
      applicationId: application._id,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all volunteers (Admin)
// @route   GET /api/volunteers
// @access  Private (Admin)
export const getVolunteers = async (req, res, next) => {
  try {
    const { status, search, interest } = req.query;
    let query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (interest && interest !== 'All') {
      query.areasOfInterest = interest;
    }

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
      ];
    }

    const volunteers = await Volunteer.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: volunteers.length, volunteers });
  } catch (err) {
    next(err);
  }
};

// @desc    Update volunteer application status
// @route   PUT /api/volunteers/:id
// @access  Private (Admin)
export const updateVolunteerStatus = async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;
    let volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer) {
      return res.status(404).json({ success: false, message: 'Volunteer application not found.' });
    }

    if (status) volunteer.status = status;
    if (adminNotes !== undefined) volunteer.adminNotes = adminNotes;

    await volunteer.save();

    res.status(200).json({
      success: true,
      message: 'Volunteer application updated successfully.',
      volunteer,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete volunteer application
// @route   DELETE /api/volunteers/:id
// @access  Private (Admin)
export const deleteVolunteer = async (req, res, next) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) {
      return res.status(404).json({ success: false, message: 'Volunteer application not found.' });
    }

    await Volunteer.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Volunteer application removed successfully.' });
  } catch (err) {
    next(err);
  }
};
