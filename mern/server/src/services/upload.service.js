const { cloudinary, cloudinaryConfigured } = require('../config/cloudinary');
const ApiError = require('../utils/ApiError');

async function uploadImageBuffer(buffer, folder = 'sheeza-portfolio') {
  if (!cloudinaryConfigured) throw ApiError.badRequest('Image upload is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET on the server.');
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder, resource_type: 'image' }, (err, result) => {
      if (err) return reject(ApiError.badRequest(`Image upload failed: ${err.message || 'unknown error'}`));
      resolve(result.secure_url);
    });
    stream.end(buffer);
  });
}
module.exports = { uploadImageBuffer, cloudinaryConfigured };
