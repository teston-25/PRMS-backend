const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../middleware/catchAsync');
const crypto = require('crypto');
const sendEmail = require('../utils/emailSender');
const emailVerify = require('../utils/emailVerify');
const generateToken = require('../utils/tokenGen');
const logAction = require('../utils/logAction');
const bcrypt = require('bcryptjs');

// Signup
exports.signup = catchAsync(async (req, res, next) => {
  const { fullName, email, password, role } = req.body;
  const isVerified = await emailVerify(email);

  if (isVerified.success === false)
    return next(new AppError('Invalid email: please use a valid email', 400));

  const exists = await User.findOne({ email });
  if (exists) {
    return next(new AppError('Email already exists', 400));
  }
  const user = await User.create({ fullName, email, password, role });
  const token = generateToken(user);

  await logAction({
    req,
    actor: user,
    action: 'User Signup',
    targetType: 'User',
    targetId: user._id,
  });

  res.status(201).json({
    status: 'success',
    message: 'User registered successfully',
    emailStatus: isVerified.message,
    user: {
      id: user._id,
      fullName: user.fullName,
      role: user.role,
    },
    token,
  });
});

// Signin
exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  const user = await User.findOne({ email: cleanEmail }).select('+password');

  if (!user) {
    return next(new AppError('Invalid email or password', 401));
  }

  const isMatch = await bcrypt.compare(cleanPassword, user.password);

  if (!isMatch) {
    return next(new AppError('Invalid email or password', 401));
  }

  if (!user.active) {
    return next(new AppError('Account is deactivated', 403));
  }

  const token = generateToken(user);

  res.status(200).json({
    status: 'success',
    message: 'Login successful',
    user: {
      id: user._id,
      fullName: user.fullName,
      role: user.role,
    },
    token,
  });
});

// Request password reset
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('No user with that email', 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  await logAction({
    req,
    action: 'Forgot Password',
    targetType: 'User',
    targetId: user._id,
  });

  const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token (valid for 10 minutes)',
      message: `Reset your password by visiting: ${resetURL}`,
      resetURL: resetURL,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError('Error sending email. Try again later.', 500));
  }
});

// Reset password
exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or expired', 400));
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  await logAction({
    req,
    actor: user,
    action: 'Password-Reset Performed',
    targetType: 'User',
    targetId: user._id,
  });

  const token = generateToken(user);
  res.status(200).json({
    status: 'success',
    message: 'Password reset successful',
    token,
  });
});
