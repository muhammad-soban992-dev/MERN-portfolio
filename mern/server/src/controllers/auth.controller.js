const bcrypt = require('bcryptjs');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');
const { signToken, cookieOptions, clearCookieOptions } = require('../services/token.service');

// Compared against when the email does not exist, so a wrong email and a wrong
// password take the same time (prevents account enumeration by timing).
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', 12);

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: String(email).toLowerCase() });
  const ok = await bcrypt.compare(password, user ? user.passwordHash : DUMMY_HASH);
  if (!user || !ok) throw ApiError.unauthorized('Invalid email or password.');
  res.cookie('token', signToken(user), cookieOptions());
  res.json({ success: true, data: { email: user.email, role: user.role }, message: 'Logged in successfully.' });
});
const logout = asyncHandler(async (_req, res) => {
  res.clearCookie('token', clearCookieOptions());
  res.json({ success: true, data: null, message: 'Logged out successfully.' });
});
const me = asyncHandler(async (req, res) => {
  res.json({ success: true, data: { email: req.user.email, role: req.user.role }, message: 'Authenticated user.' });
});
module.exports = { login, logout, me };
