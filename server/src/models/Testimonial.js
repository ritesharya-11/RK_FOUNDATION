import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name of person'],
      trim: true,
    },
    role: {
      type: String,
      default: 'Donor & Supporter',
    },
    message: {
      type: String,
      required: [true, 'Please provide testimonial message'],
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Testimonial', testimonialSchema);
