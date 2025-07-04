const User = require('../models/userModel');
const catchAsync = require('../middleware/catchAsync');
const AppError = require('../utils/appError');
const logAction = require('../utils/logAction');

/** ================= Role Matrix =================
 Handler           Admin  Staff  Doctor  User 
|----------------|:-----:|:-----:|:------:|:----:|
 getAllUsers        ✔       ✔       ✖      ✖   
 updateUserRole     ✔       ✖       ✖      ✖   
 updateUserStatus   ✔       ✔       ✖      ✖   
 deleteUser         ✔       ✖       ✖      ✖   
================================================= */

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateUserRole = catchAsync(async (req, res, next) => {
  const { role } = req.body;
  if (!['admin', 'staff', 'user', 'doctor'].includes(role)) {
    return next(new AppError('Invalid role', 400));
  }

  const prevUser = await User.findById(req.params.id);
  if (!prevUser) return next(new AppError('user not found', 404));

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  );
  if (!user) return next(new AppError('user not found', 404));

  await logAction({
    req,
    action: 'Update User Role',
    targetType: 'User',
    targetId: user._id,
    details: { oldRole: prevUser.role, newRole: user.role },
  });

  res.status(200).json({
    status: 'success',
    message: 'user role updated successfully',
    data: {
      user,
    },
  });
});

exports.updateUserStatus = catchAsync(async (req, res, next) => {
  const { active } = req.body;

  const prevUser = await User.findById(req.params.id);
  if (!prevUser) return next(new AppError('user not found', 404));

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { active },
    { new: true }
  );

  if (!user) return next(new AppError('user not found', 404));

  await logAction({
    req,
    action: 'Update User Status',
    targetType: 'User',
    targetId: user._id,
    details: { oldStatus: prevUser.active, newStatus: user.active },
  });

  res.status(200).json({
    status: 'success',
    message: 'user status updated successfully',
    user,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) return next(new AppError('user not found', 404));

  await logAction({
    req,
    action: 'Delete User',
    targetType: 'User',
    targetId: user._id,
    details: { deletedUserEmail: user.email },
  });

  res.status(204).json({
    status: 'success',
    message: 'user deleted!',
  });
});
