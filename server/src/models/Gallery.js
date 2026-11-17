import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide gallery image title'],
      trim: true,
    },
    category: {
      type: String,
      default: 'General Community Work',
    },
    imageUrl: {
      type: String,
      required: [true, 'Please provide image URL or uploaded file path'],
    },
    caption: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: 'Delhi-NCR',
    },
    eventDate: {
      type: Date,
      default: Date.now,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Gallery', gallerySchema);
