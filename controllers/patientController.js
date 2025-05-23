const Patient = require('./../models/patientsModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.getPatients = catchAsync(async (req, res, next) => {
  const patients = await Patient.find();

  res.status(200).json({
    status: 'success',
    results: patients.length,
    data: { patients },
  });
});

exports.addPatient = catchAsync(async (req, res, next) => {
  const newPatient = await Patient.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { patient: newPatient },
  });
});

exports.getSinglePatient = catchAsync(async (req, res, next) => {
  const patient = await Patient.findById(req.params.id).populate(
    'appointments'
  );

  if (!patient) return next(new AppError('Patient not found', 404));

  res.status(200).json({
    status: 'success',
    data: { patient },
  });
});

exports.updatePatient = catchAsync(async (req, res, next) => {
  const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!patient) return next(new AppError('Patient not found', 404));

  res.status(200).json({
    status: 'success',
    data: { patient },
  });
});

exports.deletePatient = catchAsync(async (req, res, next) => {
  const patient = await Patient.findByIdAndDelete(req.params.id);

  if (!patient) return next(new AppError('Patient not found', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
