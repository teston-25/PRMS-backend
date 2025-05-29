const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, restrictTo } = require('../middleware/protect');

router.use(protect, restrictTo('admin'));
router.get('/', userController.getAllUsers);
router.patch('/:id/role', userController.updateUserRole);
router.patch('/:id/status', userController.updateUserStatus);
router.delete('/:id', userController.deleteUser);

module.exports = router;
