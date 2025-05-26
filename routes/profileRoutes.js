const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const protect = require('./../middleware/protect');

router.get('/me', protect, profileController.getProfile);
router.patch('/me', protect, profileController.updateProfile);
router.patch('/change-password', protect, profileController.changePassword);

// router.patch(
//   '/:id/photo',
//   protect,
//   upload.single('photo'),
//   profileController.uploadPhoto
// );

module.exports = router;
