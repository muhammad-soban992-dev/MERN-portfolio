const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Message = require('../models/Message');
const { sendContactNotification } = require('../services/mail.service');

const createMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, body } = req.body;
  const message = await Message.create({ name, email, subject, body, ip: req.ip || '' });
  // Email notification is best-effort: a mail failure must not fail the saved message.
  try { await sendContactNotification(message); } catch (_e) { /* logged inside mail service; message already saved */ }
  res.status(201).json({ success: true, data: { id: message._id }, message: 'Thank you — your message has been received.' });
});
const listMessages = asyncHandler(async (_req, res) => {
  const items = await Message.find().sort({ createdAt: -1 });
  res.json({ success: true, data: items, message: 'Messages retrieved.' });
});
const updateMessage = asyncHandler(async (req, res) => {
  const item = await Message.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
  if (!item) throw ApiError.notFound('Message not found.');
  res.json({ success: true, data: item, message: 'Message updated.' });
});
const deleteMessage = asyncHandler(async (req, res) => {
  const item = await Message.findByIdAndDelete(req.params.id);
  if (!item) throw ApiError.notFound('Message not found.');
  res.json({ success: true, data: null, message: 'Message deleted.' });
});
module.exports = { createMessage, listMessages, updateMessage, deleteMessage };
