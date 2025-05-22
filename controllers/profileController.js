const bcrypt = require('bcryptjs');
const User = require('../models/user');
const AppError = require('../utils/appError');
const validator = require('validator');
const fs = require('fs');
const path = require('path');

exports.getProfile = async (req, res, next) => {
  try {
    // Use req.user.id set by your auth middleware (protect)
    const userId = req.user.id;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id; // use authenticated user id
    const { fullName, email, password, oldPassword } = req.body;

    // Validate email if provided
    if (email && !validator.isEmail(email)) {
      return next(new AppError('Please provide a valid email', 400));
    }
    // Validate new password if provided
    if (password && password.length < 8) {
      return next(new AppError('Password must be at least 8 characters', 400));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    // Update name and email if provided
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;

    // Handle password update if requested
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

    // Remove password before sending response
    user.password = undefined;

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (err) {
    next(err);
  }
};

exports.uploadPhoto = async (req, res, next) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return next(new AppError('No file uploaded', 400));
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    // Optional: delete old photo if exists and stored locally
    if (user.photo) {
      const oldPhotoPath = path.join(
        __dirname,
        '..',
        'public',
        'uploads',
        user.photo
      );
      if (fs.existsSync(oldPhotoPath)) {
        fs.unlinkSync(oldPhotoPath);
      }
    }

    // Save the filename or path in user profile
    user.photo = req.file.filename; // assuming multer stores filename here

    await user.save();

    user.password = undefined;

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};
