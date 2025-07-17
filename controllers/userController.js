const User = require('../models/userModel');
const catchAsync = require('../middleware/catchAsync');
const AppError = require('../utils/appError');
const logAction = require('../utils/logAction');

/** ================= Role Matrix =================
 Handler           Admin  Staff  Doctor  User 
|----------------|:-----:|:-----:|:------:|:----:|
 getAllUsers        ✔       ✔       ✖      ✖   
 getUserById        ✔       ✔       ✖      ✖   
 updateUserRole     ✔       ✖       ✖      ✖   
 updateUserStatus   ✔       ✖       ✖      ✖   
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

exports.getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { role, active } = req.body;

  // Validate at least one field is being updated
  if (role === undefined && active === undefined) {
    return next(new AppError('No update fields provided', 400));
  }

  // Validate role if provided
  if (role && !['admin', 'staff', 'user', 'doctor'].includes(role)) {
    return next(new AppError('Invalid role', 400));
  }

  // Get previous user data
  const prevUser = await User.findById(id);
  if (!prevUser) return next(new AppError('User not found', 404));

  // Prepare update object
  const updateData = {};
  if (role !== undefined) updateData.role = role;
  if (active !== undefined) updateData.active = active;

  // Perform the update
  const user = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  // Log actions for both possible changes
  const logDetails = {};
  if (role !== undefined) {
    logDetails.roleChange = {
      from: prevUser.role,
      to: user.role,
    };
  }
  if (active !== undefined) {
    logDetails.statusChange = {
      from: prevUser.active,
      to: user.active,
    };
  }

  await logAction({
    req,
    action: 'Update User',
    targetType: 'User',
    targetId: user._id,
    details: logDetails,
  });

  // Prepare response message
  let message = 'User updated successfully';
  if (role !== undefined && active !== undefined) {
    message = 'User role and status updated successfully';
  } else if (role !== undefined) {
    message = 'User role updated successfully';
  } else if (active !== undefined) {
    message = 'User status updated successfully';
  }

  res.status(200).json({
    status: 'success',
    message,
    data: {
      user,
    },
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
