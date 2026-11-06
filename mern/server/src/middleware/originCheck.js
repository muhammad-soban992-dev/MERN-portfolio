const { env } = require('../config/env');
const ApiError = require('../utils/ApiError');

// Defence in depth against CSRF on top of SameSite cookies: any state-changing
// request that carries an Origin header must come from an allowed client origin.
const SAFE = new Set(['GET', 'HEAD', 'OPTIONS']);
function originCheck(req, _res, next) {
  if (SAFE.has(req.method)) return next();
  const origin = req.get('origin');
  if (origin && !env.clientOrigins.includes(origin)) return next(ApiError.forbidden('Origin not allowed.'));
  return next();
}
module.exports = originCheck;
