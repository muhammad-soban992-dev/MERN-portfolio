const multer = require('multer');
const ApiError = require('../utils/ApiError');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1, fields: 0 },
  fileFilter: (_req, file, cb) => {
    if (/^image\/(jpeg|png|webp|gif)$/.test(file.mimetype)) cb(null, true);
    else cb(ApiError.badRequest('Only JPEG, PNG, WebP or GIF images are allowed.'));
  },
});

// The MIME type comes from the client and can be faked, so also check the real file signature.
function isRealImage(buf) {
  if (!buf || buf.length < 12) return false;
  const jpg = buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
  const png = buf.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  const gif = buf.slice(0, 6).toString('ascii') === 'GIF87a' || buf.slice(0, 6).toString('ascii') === 'GIF89a';
  const webp = buf.slice(0, 4).toString('ascii') === 'RIFF' && buf.slice(8, 12).toString('ascii') === 'WEBP';
  return jpg || png || gif || webp;
}
function verifyImageSignature(req, _res, next) {
  if (req.file && !isRealImage(req.file.buffer)) return next(ApiError.badRequest('That file is not a valid image.'));
  return next();
}
module.exports = upload;
module.exports.verifyImageSignature = verifyImageSignature;
