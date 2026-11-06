const asyncHandler = require('../utils/asyncHandler');
const { uploadImageBuffer } = require('../services/upload.service');
const ApiError = require('../utils/ApiError');

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) throw ApiError.badRequest('No image file was uploaded. Choose an image and try again.');
  const url = await uploadImageBuffer(req.file.buffer);
  res.json({ success: true, data: { url }, message: 'Image uploaded.' });
});
module.exports = { uploadImage };
