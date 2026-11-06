const router = require('express').Router();
const upload = require('../middleware/upload');
const { verifyImageSignature } = upload;
const { verifyToken, requireAdmin } = require('../middleware/auth');
const { uploadImage } = require('../controllers/upload.controller');
router.post('/', verifyToken, requireAdmin, upload.single('image'), verifyImageSignature, uploadImage);
module.exports = router;
