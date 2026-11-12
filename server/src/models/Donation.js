import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
  {
    receiptNumber: {
      type: String,
      unique: true,
      required: true,
    },
    donorName: {
      type: String,
      required: [true, 'Please provide donor full name'],
      trim: true,
    },
    donorEmail: {
      type: String,
      required: [true, 'Please provide donor email address'],
      lowercase: true,
      trim: true,
    },
    donorPhone: {
      type: String,
      required: [true, 'Please provide donor phone number'],
      trim: true,
    },
    donorPan: {
      type: String,
      uppercase: true,
      trim: true,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
    postalCode: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: 'India',
    },
    amount: {
      type: Number,
      required: [true, 'Please provide donation amount'],
      min: [100, 'Minimum donation amount is ₹100'],
    },
    currency: {
      type: String,
      default: 'INR',
    },
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      default: null,
    },
    campaignTitle: {
      type: String,
      default: 'General Charitable Relief Fund',
    },
    paymentGateway: {
      type: String,
      enum: ['razorpay', 'upi', 'bank_transfer', 'test_mode', 'manual', 'cash', 'cheque', 'website'],
      default: 'razorpay',
    },
    source: {
      type: String,
      enum: ['portal', 'manual'],
      default: 'portal',
    },
    orderId: {
      type: String,
      default: '',
    },
    paymentId: {
      type: String,
      default: '',
    },
    signature: {
      type: String,
      default: '',
    },
    paymentStatus: {
      type: String,
      enum: ['created', 'captured', 'failed', 'refunded'],
      default: 'created',
    },
    taxExemption80G: {
      type: Boolean,
      default: true,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Create index for search and fast querying
donationSchema.index({ paymentStatus: 1, createdAt: -1 });
donationSchema.index({ donorEmail: 1 });

export default mongoose.model('Donation', donationSchema);
