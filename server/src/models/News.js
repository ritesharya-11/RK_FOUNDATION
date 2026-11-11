import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide news/article title'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    summary: {
      type: String,
      required: [true, 'Please provide summary/excerpt'],
      maxlength: [300, 'Summary cannot exceed 300 characters'],
    },
    content: {
      type: String,
      required: [true, 'Please provide full article content'],
    },
    author: {
      type: String,
      default: 'RK FOUNDATION Editorial Desk',
    },
    category: {
      type: String,
      enum: [
        'Press Release',
        'Field Stories',
        'Annual Report',
        'Community Updates',
        'Awareness & Advocacy',
      ],
      default: 'Field Stories',
    },
    coverImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200&auto=format&fit=crop',
    },
    tags: [
      {
        type: String,
      },
    ],
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('News', newsSchema);
