const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

function notFound(req, res, next) {
  next(ApiError.notFound('Route not found.'));
}

function errorHandler(err, req, res, _next) {
  // Mongo duplicate key
  if (err && err.code === 11000) {
    return res.status(409).json({ success: false, message: 'Duplicate value: a record with that unique field already exists.' });
  }
  // Bad ObjectId etc.
  if (err && err.name === 'CastError') return res.status(400).json({ success: false, message: 'Invalid identifier.' });
  // Upload problems (file too large, too many files, wrong type)
  if (err && err.name === 'MulterError') {
    const msg = err.code === 'LIMIT_FILE_SIZE' ? 'Image is too large (max 5 MB).' : 'Invalid upload.';
    return res.status(400).json({ success: false, message: msg });
  }
  // Malformed JSON body / payload too large
  if (err && err.type === 'entity.parse.failed') return res.status(400).json({ success: false, message: 'Malformed JSON body.' });
  if (err && err.type === 'entity.too.large') return res.status(413).json({ success: false, message: 'Request body too large.' });

  const status = err.statusCode || (err.name === 'ValidationError' ? 400 : 500);
  if (status >= 500) logger.error(err);
  // Never leak internals for unexpected errors.
  const message = err.isOperational || status < 500 ? err.message : 'Internal server error';
  const errors = err.errors && err.isOperational
    ? err.errors
    : (err.name === 'ValidationError' && err.errors ? Object.values(err.errors).map((e) => ({ field: e.path, message: e.message })) : undefined);
  return res.status(status).json({ success: false, message, ...(errors ? { errors } : {}) });
}
module.exports = { notFound, errorHandler };
