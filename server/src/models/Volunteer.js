import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email address'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide your contact phone number'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'Please provide your city'],
      trim: true,
    },
    state: {
      type: String,
      default: 'Delhi-NCR',
      trim: true,
    },
    occupation: {
      type: String,
      default: 'Student / Professional',
    },
    education: {
      type: String,
      default: '',
    },
    availableHoursPerWeek: {
      type: String,
      enum: ['2-4 hours', '5-10 hours', '10-20 hours', 'Weekends only', 'Full-time'],
      default: 'Weekends only',
    },
    areasOfInterest: [
      {
        type: String,
        enum: [
          'Child Tutoring & Education',
          'Medical & Health Camps',
          'Food & Nutrition Drives',
          'Women Vocational Training',
          'Social Media & Content',
          'Fundraising & Outreach',
          'Event Management & Logistics',
        ],
      },
    ],
    previousExperience: {
      type: String,
      default: '',
    },
    motivation: {
      type: String,
      required: [true, 'Please tell us why you want to join RK FOUNDATION'],
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'contacted', 'rejected'],
      default: 'pending',
    },
    adminNotes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Volunteer', volunteerSchema);
