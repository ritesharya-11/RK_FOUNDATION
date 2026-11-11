import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide campaign/project title'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      enum: [
        'Urgent Medical Relief',
        'Slum Child Education',
        'Women Vocational Center',
        'Ration & Nutrition Kit',
        'Disaster & Winter Relief',
        'Sanitation & Clean Water',
      ],
      default: 'Slum Child Education',
    },
    summary: {
      type: String,
      required: [true, 'Please provide project summary'],
      maxlength: [300, 'Summary cannot exceed 300 characters'],
    },
    story: {
      type: String,
      required: [true, 'Please provide project background and story'],
    },
    targetAmount: {
      type: Number,
      required: [true, 'Please set target fundraising amount in INR'],
      min: [1000, 'Target amount must be at least ₹1,000'],
    },
    raisedAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    donorsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    coverImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?q=80&w=1200&auto=format&fit=crop',
    },
    galleryImages: [
      {
        type: String,
      },
    ],
    isUrgent: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'paused'],
      default: 'active',
    },
    beneficiaryNameOrGroup: {
      type: String,
      default: 'Underprivileged Children & Families',
    },
    location: {
      type: String,
      default: 'Delhi-NCR & Western UP',
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for calculation of progress percentage
projectSchema.virtual('progressPercentage').get(function () {
  if (!this.targetAmount || this.targetAmount === 0) return 0;
  const pct = Math.round((this.raisedAmount / this.targetAmount) * 100);
  return pct > 100 ? 100 : pct;
});

projectSchema.set('toJSON', { virtuals: true });
projectSchema.set('toObject', { virtuals: true });

export default mongoose.model('Project', projectSchema);
