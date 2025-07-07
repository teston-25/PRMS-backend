const Patient = require('./../models/patientsModel');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('../middleware/catchAsync');
const logAction = require('../utils/logAction');
const bcrypt = require('bcryptjs');

/* ================= Role Matrix =================
 Handler             Admin  Staff  Doctor  User (patient) 
|--------------------|:-----:|:----:|:----:|:------------:|
 getPatients           ✔      ✔      ✖      ✖ 
 addPatient            ✔      ✔      ✖      ✖ 
 getSinglePatient      ✔      ✔      ✔      ✔ 
 updatePatient         ✔      ✔      ✖      ✖ 
 deletePatient         ✔      ✔      ✖      ✖ 
 searchPatients        ✔      ✔      ✖      ✖ 
================================================= */

exports.getPatients = catchAsync(async (req, res, next) => {
  const patients = await Patient.find();

  res.status(200).json({
    status: 'success',
    results: patients.length,
    data: { patients },
  });
});

exports.addPatient = catchAsync(async (req, res, next) => {
  const { email, phone, firstName, lastName } = req.body;

  const cleanPhone = phone.replace(/\D/g, '');
  const cleanEmail = email.trim().toLowerCase();
  const cleanFirstName = firstName.trim();

  const existingPatient = await Patient.findOne({
    $or: [{ email: cleanEmail }, { phone: cleanPhone }],
  });
  if (existingPatient) return next(new AppError('Patient exists', 400));

  let user = await User.findOne({
    $or: [{ email: cleanEmail }, { phone: cleanPhone }],
  });

  let defaultPassword;
  if (!user) {
    defaultPassword = cleanPhone;

    user = await User.create({
      fullName: `${cleanFirstName} ${lastName}`.trim(),
      email: cleanEmail,
      phone: cleanPhone,
      role: 'user',
      password: defaultPassword,
    });
  }

  const newPatient = await Patient.create({
    ...req.body,
    firstName: cleanFirstName,
    email: cleanEmail,
    phone: cleanPhone,
    user: user._id,
  });

  user.patient = newPatient._id;
  await user.save({ validateBeforeSave: false });

  res.status(201).json({
    status: 'success',
    data: {
      patient: newPatient,
      loginCredentials: user
        ? {
            email: cleanEmail,
            password: user.password,
          }
        : undefined,
    },
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

  await logAction({
    req,
    action: 'Update Patient',
    targetType: 'Patient',
    targetId: patient._id,
    details: { updatedPatient: patient.name },
  });

  res.status(200).json({
    status: 'success',
    data: { patient },
  });
});

exports.deletePatient = catchAsync(async (req, res, next) => {
  const patient = await Patient.findByIdAndDelete(req.params.id);

  if (!patient) return next(new AppError('Patient not found', 404));

  await logAction({
    req,
    action: 'Delete Patient',
    targetType: 'Patient',
    targetId: patient._id,
    details: { deletedPatient: patient.name },
  });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.searchPatients = catchAsync(async (req, res, next) => {
  const { q } = req.query;

  if (!q) {
    return next(new AppError('Search query is required', 400));
  }

  const regex = new RegExp(q, 'i');

  const results = await Patient.find({
    $or: [
      { firstName: regex },
      { lastName: regex },
      { email: regex },
      { phone: regex },
    ],
  });

  res.status(200).json({
    status: 'success',
    results: results.length,
    data: results,
  });
});
