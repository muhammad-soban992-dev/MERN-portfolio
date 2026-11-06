const mongoose = require('mongoose');
const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true, trim: true },
  institute: { type: String, required: true, trim: true },
  startYear: { type: Number },
  endYear: { type: Number },
  grade: { type: String, default: '' },
  description: { type: String, default: '' },
  courses: { type: [String], default: [] },
  order: { type: Number, default: 0 },
}, { timestamps: true });
module.exports = mongoose.model('Education', educationSchema);
