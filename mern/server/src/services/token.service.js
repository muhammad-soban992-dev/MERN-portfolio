const jwt = require('jsonwebtoken');
const { env } = require('../config/env');

function signToken(user) {
  return jwt.sign(
    { sub: String(user._id), role: user.role },
    env.jwtSecret,
    { algorithm: 'HS256', expiresIn: `${env.sessionHours}h` },
  );
}
function baseCookie() {
  return { httpOnly: true, secure: env.cookieSecure || env.cookieSameSite === 'none', sameSite: env.cookieSameSite, path: '/' };
}
function cookieOptions() {
  return { ...baseCookie(), maxAge: env.sessionHours * 60 * 60 * 1000 };
}
function clearCookieOptions() { return baseCookie(); }
module.exports = { signToken, cookieOptions, clearCookieOptions };
