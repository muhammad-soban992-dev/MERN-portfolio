const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Profile = require('../models/Profile');
const getProfile = asyncHandler(async (_req, res) => {
  const profile = await Profile.findOne();
  if (!profile) throw ApiError.notFound('Profile has not been set up yet.');
  res.json({ success: true, data: profile, message: 'Profile retrieved.' });
});
const updateProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOneAndUpdate({}, req.body, { new: true, upsert: true, runValidators: true });
  res.json({ success: true, data: profile, message: 'Profile updated.' });
});
module.exports = { getProfile, updateProfile };
