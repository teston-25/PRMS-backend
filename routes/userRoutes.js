const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, restrictTo } = require('../middleware/protect');

router.use(protect);

router.route('/').get(restrictTo('admin', 'staff'), userController.getAllUsers);

router
  .route('/:id/role')
  .patch(restrictTo('admin'), userController.updateUserRole);

router
  .route('/:id/status')
  .patch(restrictTo('admin', 'staff'), userController.updateUserStatus);

router.route('/:id').delete(restrictTo('admin'), userController.deleteUser);

module.exports = router;
