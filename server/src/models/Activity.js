import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide activity title'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Please provide date of the activity'],
      default: Date.now,
    },
    location: {
      type: String,
      required: [true, 'Please provide location of activity'],
      trim: true,
    },
    category: {
      type: String,
      enum: [
        'Dalit Upliftment & Rights',
        'Health Camp',
        'Ration & Food Distribution',
        'Winter Blanket Drive',
        'Education Kit Distribution',
        'Women Workshop',
        'Tree Plantation & Cleanliness',
      ],
      default: 'Dalit Upliftment & Rights',
    },
    description: {
      type: String,
      required: [true, 'Please provide activity description'],
    },
    beneficiariesCount: {
      type: Number,
      default: 0,
    },
    coverImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop',
    },
    galleryImages: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ['upcoming', 'completed', 'ongoing'],
      default: 'completed',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Activity', activitySchema);
