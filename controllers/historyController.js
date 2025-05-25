const History = require('../models/historyModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

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
  res.status(200).json({
    status: 'success',
    data: updated,
  });
});

exports.deleteMedicalHistory = catchAsync(async (req, res, next) => {
  const deleted = await History.findByIdAndDelete(req.params.id);
  if (!deleted) return next(new AppError('Entry not found', 404));
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
