const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const validator = require('validator');
const fs = require('fs');
const path = require('path');
const catchAsync = require('../middleware/catchAsync');

exports.getProfile = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findById(userId).select('-password');

  if (!user) return next(new AppError('User not found', 404));

  res.status(200).json({
    status: 'success',
    data: { user },
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

  const user = await User.findById(userId);
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

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(password, salt);
  }

  await user.save();
  user.password = undefined;

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return next(new AppError('Please provide current and new password', 400));
  }

  const user = await User.findById(userId).select('+password');

  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    return next(new AppError('Your current password is incorrect', 401));
  }

  user.password = newPassword;
  await user.save();

  const token = generateToken(user);

  res.status(200).json({
    status: 'success',
    message: 'Password changed successfully',
    token,
  });
});

// exports.uploadPhoto = catchAsync(async (req, res, next) => {
//   const userId = req.user.id;

//   if (!req.file) {
//     return next(new AppError('No file uploaded', 400));
//   }

//   const user = await User.findById(userId);
//   if (!user) return next(new AppError('User not found', 404));

//   if (user.photo) {
//     const oldPhotoPath = path.join(
//       __dirname,
//       '..',
//       'public',
//       'uploads',
//       user.photo
//     );
//     if (fs.existsSync(oldPhotoPath)) {
//       fs.unlinkSync(oldPhotoPath);
//     }
//   }

//   user.photo = req.file.filename;
//   await user.save();
//   user.password = undefined;

//   res.status(200).json({
//     status: 'success',
//     data: { user },
//   });
// });
