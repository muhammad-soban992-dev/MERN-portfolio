const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  summary: { type: String, required: true },
  description: { type: String, default: '' },
  stack: { type: [String], default: [] },
  images: { type: [String], default: [] },
  liveUrl: { type: String, default: '' },
  repoUrl: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });
module.exports = mongoose.model('Project', projectSchema);
