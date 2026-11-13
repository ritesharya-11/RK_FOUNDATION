import mongoose from 'mongoose';

const programSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide program title'],
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
        'Children Development',
        'Aged / Elderly Care',
        'Education and Literacy',
        'Dalit Upliftment & Rights',
        'Drinking Water & Sanitation',
        "Women's Development and Empowerment",
        'Differently Abled Support',
        'Health and Family Welfare',
        'Environment and Forest Protection',
        'Disaster Management & Emergency Relief',
        // Legacy support
        'Child Education',
        'Child Welfare',
        'Women Empowerment',
        'Elderly Support',
        'Special Needs',
        'Education',
        'Healthcare',
        'Healthcare & Relief',
        'Nutrition & Food Security',
        'Elderly Care',
        'Community Welfare',
      ],
      default: 'Children Development',
    },
    shortDescription: {
      type: String,
      required: [true, 'Please provide a short description'],
      maxlength: [280, 'Short description cannot exceed 280 characters'],
    },
    fullDescription: {
      type: String,
      required: [true, 'Please provide full description'],
    },
    iconName: {
      type: String,
      default: 'BookOpen',
    },
    coverImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop',
    },
    objectives: [
      {
        type: String,
      },
    ],
    beneficiariesCount: {
      type: Number,
      default: 0,
    },
    budgetOrCostPerChild: {
      type: Number,
      default: 1500,
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Program', programSchema);
