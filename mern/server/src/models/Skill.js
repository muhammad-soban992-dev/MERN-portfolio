const mongoose = require('mongoose');
const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, enum: ['Technical', 'Professional'], required: true },
  level: { type: Number, min: 0, max: 100, default: 80 },
  levelLabel: { type: String, default: 'Strong' },
  description: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });
module.exports = mongoose.model('Skill', skillSchema);
