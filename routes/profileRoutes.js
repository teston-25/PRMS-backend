const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const protect = require('./../middleware/protect');

router.get('/:id', protect, profileController.getProfile);
router.patch('/:id', protect, profileController.updateProfile);
// router.patch(
//   '/:id/photo',
//   protect,
//   upload.single('photo'),
//   profileController.uploadPhoto
// );

module.exports = router;
