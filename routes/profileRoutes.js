const express = require('express');
const router = express.Router();

const { getMe, updateMe } = require('../controllers/profileController');

router.route('/me').get(getMe).put(updateMe);

module.exports = router;
