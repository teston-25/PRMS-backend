const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { protect, restrictTo } = require('../middleware/protect');

router.use(protect, restrictTo('admin', 'staff', 'user', 'doctor'));
router.get('/me', profileController.getProfile);
router.patch('/me', profileController.updateProfile);

module.exports = router;
