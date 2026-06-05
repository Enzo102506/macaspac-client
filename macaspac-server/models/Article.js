const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: 'General',
    },
    coverImage: {
      type: String,
      default: '',
    },
    paragraphs: {
      type: [String],
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    authorRole: {
      type: String,
      enum: ['admin', 'editor', 'viewer'],
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
    publishDate: {
      type: Date,
      default: null,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);
