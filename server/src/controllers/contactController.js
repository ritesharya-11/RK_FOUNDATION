import ContactMessage from '../models/ContactMessage.js';

// @desc    Submit Contact Inquiry
// @route   POST /api/contact
// @access  Public
export const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields (Name, Email, Subject, Message).',
      });
    }

    const newMessage = await ContactMessage.create({
      name,
      email,
      phone: phone || '',
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting RK FOUNDATION! Our team will respond within 24-48 business hours.',
      inquiryId: newMessage._id,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all contact messages (Admin)
// @route   GET /api/contact
// @access  Private (Admin)
export const getContactMessages = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    let query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }

    const messages = await ContactMessage.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: messages.length, messages });
  } catch (err) {
    next(err);
  }
};

// @desc    Update contact message status
// @route   PUT /api/contact/:id
// @access  Private (Admin)
export const updateContactMessageStatus = async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;
    let msg = await ContactMessage.findById(req.params.id);

    if (!msg) {
      return res.status(404).json({ success: false, message: 'Message record not found.' });
    }

    if (status) msg.status = status;
    if (adminNotes !== undefined) msg.adminNotes = adminNotes;

    await msg.save();

    res.status(200).json({
      success: true,
      message: 'Message updated successfully.',
      messageItem: msg,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
export const deleteContactMessage = async (req, res, next) => {
  try {
    const msg = await ContactMessage.findById(req.params.id);
    if (!msg) {
      return res.status(404).json({ success: false, message: 'Message not found.' });
    }

    await ContactMessage.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Message deleted successfully.' });
  } catch (err) {
    next(err);
  }
};
