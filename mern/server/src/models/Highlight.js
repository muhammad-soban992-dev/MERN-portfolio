const mongoose = require('mongoose');
const highlightSchema = new mongoose.Schema({
  label: { type: String, required: true, trim: true },
  value: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });
module.exports = mongoose.model('Highlight', highlightSchema);
