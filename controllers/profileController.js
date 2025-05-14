// GET /me - Get current user's profile
exports.getMe = catchAsync(async (req, res) => {
  const userId = req.user.id; // req.user must be set by auth middleware

  const user = await User.findById(userId).select('-password'); // Exclude password
  if (!user) {
    return res.status(404).json({ status: 'fail', message: 'User not found' });
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

// PUT /me - Update current user's profile
exports.updateMe = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const allowedUpdates = { name: req.body.name, email: req.body.email };
  const updatedUser = await User.findByIdAndUpdate(userId, allowedUpdates, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});
