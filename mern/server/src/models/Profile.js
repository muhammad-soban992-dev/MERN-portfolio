const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  headline: { type: String, default: '' },
  roles: { type: [String], default: [] },
  lead: { type: String, default: '' },
  summary: { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
  resumeUrl: { type: String, default: '' },
  stats: [{ label: { type: String, required: true }, value: { type: String, required: true } }],
  facts: [{ label: { type: String, required: true }, value: { type: String, required: true } }],
  social: { github: { type: String, default: '' }, linkedin: { type: String, default: '' }, email: { type: String, default: '' }, phone: { type: String, default: '' } },
  location: { type: String, default: 'Pakistan' },
}, { timestamps: true });
module.exports = mongoose.model('Profile', profileSchema);
