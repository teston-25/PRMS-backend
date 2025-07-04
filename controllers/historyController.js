const History = require('../models/historyModel');
const AppError = require('../utils/appError');
const catchAsync = require('../middleware/catchAsync');
const logAction = require('../utils/logAction');

/*================== Role matrix ====================
Handler	                  User	Doctor	Staff	Admin
|----------------------|:----:|:----:|:----:|:------:|
Get Medical History	      ✔	    ✔	      ✔	    ✔
Add Medical History	      ✘	    ✔      	✔    	✔
Update Medical History	  ✘	    ✔	      ✔	    ✔
Delete Medical History	  ✘	    ✘	      ✔	    ✔
=====================================================*/

exports.getMedicalHistory = catchAsync(async (req, res, next) => {
  const history = await History.find({ patient: req.params.id });
  res.status(200).json({
    status: 'success',
    result: history.length,
    data: history,
  });
});

exports.addMedicalHistory = catchAsync(async (req, res, next) => {
  const newEntry = await History.create({
    ...req.body,
    patient: req.params.id,
  });

  await logAction({
    req,
    action: 'Add Medical History Entry',
    targetType: 'Patient',
    targetId: req.params.id,
    details: { AddedHistroy: newEntry._id },
  });

  res.status(201).json({
    status: 'success',
    data: newEntry,
  });
});

exports.updateMedicalHistory = catchAsync(async (req, res, next) => {
  const updated = await History.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updated) return next(new AppError('Entry not found', 404));

  await logAction({
    req,
    action: 'Update Medical History',
    targetType: 'Patient',
    targetId: updated._id,
    details: { updatedFields: Object.keys(req.body) },
  });

  res.status(200).json({
    status: 'success',
    data: updated,
  });
});

exports.deleteMedicalHistory = catchAsync(async (req, res, next) => {
  const deleted = await History.findByIdAndDelete(req.params.id);
  if (!deleted) return next(new AppError('Entry not found', 404));

  await logAction({
    req,
    action: 'Delete Medical History',
    targetType: 'Patient',
    targetId: deleted._id,
    details: { diagnosis: deleted.diagnosis },
  });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
