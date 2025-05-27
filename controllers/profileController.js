const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const validator = require('validator');
const catchAsync = require('../middleware/catchAsync');

exports.getProfile = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findById(userId).select('-password');

  if (!user) return next(new AppError('User not found', 404));

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateProfile = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { fullName, email, password, oldPassword } = req.body;

  if (email && !validator.isEmail(email)) {
    return next(new AppError('Please provide a valid email', 400));
  }

  if (password && password.length < 8) {
    return next(new AppError('Password must be at least 8 characters', 400));
  }

  const user = await User.findById(userId).select('+password');
  if (!user) return next(new AppError('User not found', 404));

  if (fullName) user.fullName = fullName;
  if (email) user.email = email;

  if (password) {
    if (!oldPassword) {
      return next(
        new AppError('Please provide your current password to change it', 400)
      );
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return next(new AppError('Current password is incorrect', 401));
    }

    user.password = password;
  }

  await user.save();
  user.password = undefined;

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});
