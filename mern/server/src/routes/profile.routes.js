const router = require('express').Router();
const validate = require('../middleware/validate');
const { profileSchema } = require('../validators');
const { getProfile, updateProfile } = require('../controllers/profile.controller');
const { verifyToken, requireAdmin } = require('../middleware/auth');
router.get('/', getProfile);
router.put('/', verifyToken, requireAdmin, validate(profileSchema), updateProfile);
module.exports = router;
