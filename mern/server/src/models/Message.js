const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true },
  subject: { type: String, required: true, trim: true, maxlength: 150 },
  body: { type: String, required: true, maxlength: 5000 },
  status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  ip: { type: String, default: '' },
}, { timestamps: true });
module.exports = mongoose.model('Message', messageSchema);
