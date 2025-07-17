const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, restrictTo } = require('../middleware/protect');

router.use(protect);

router.route('/').get(restrictTo('admin', 'staff'), userController.getAllUsers);

router.get('/:id', restrictTo('admin', 'staff'), userController.getUserById);

router.patch('/:id', restrictTo('admin'), userController.updateUser);

router.route('/:id').delete(restrictTo('admin'), userController.deleteUser);

module.exports = router;
