const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const protect = require('./../middleware/protect');

router.get('/me', protect, profileController.getProfile);
router.patch('/me', protect, profileController.updateProfile);

module.exports = router;
