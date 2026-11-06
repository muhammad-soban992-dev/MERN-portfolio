const mongoose = require('mongoose');
const expertiseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  icon: { type: String, default: 'code', trim: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  order: { type: Number, default: 0 },
}, { timestamps: true });
module.exports = mongoose.model('Expertise', expertiseSchema);
