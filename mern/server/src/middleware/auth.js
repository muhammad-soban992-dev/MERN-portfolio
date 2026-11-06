const jwt = require('jsonwebtoken');
const { env } = require('../config/env');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');

// IMPORTANT: wrapped in asyncHandler. On Express 4 an async function that throws
// would otherwise become an unhandled rejection and crash the whole server
// (any visitor hitting /auth/me without a cookie could take the API down).
const verifyToken = asyncHandler(async (req, _res, next) => {
  const token = req.cookies && req.cookies.token;
  if (!token || typeof token !== 'string') throw ApiError.unauthorized('Please log in to access this resource.');
  let payload;
  try {
    payload = jwt.verify(token, env.jwtSecret, { algorithms: ['HS256'] });
  } catch (_e) {
    throw ApiError.unauthorized('Session expired or invalid. Please log in again.');
  }
  const user = await User.findById(payload.sub).select('-passwordHash');
  if (!user) throw ApiError.unauthorized('Account no longer exists.');
  req.user = user;
  next();
});

function requireAdmin(req, _res, next) {
  if (!req.user || req.user.role !== 'admin') return next(ApiError.forbidden('Admin access required.'));
  return next();
}
module.exports = { verifyToken, requireAdmin };
