const Patient = require('./../models/patientsModel');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('../middleware/catchAsync');
const logAction = require('../utils/logAction');
const bcrypt = require('bcryptjs');
const emailVerify = require('../utils/emailVerify');

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
  const { email, phone, firstName, lastName, dob, gender, address } = req.body;

  // 1. Clean input data
  const cleanPhone = phone.toString().replace(/\D/g, '');
  const cleanEmail = email.trim().toLowerCase();
  const cleanFirstName = firstName.trim();
  const cleanLastName = lastName.trim();

  // 2. Validate email format and verify
  const isVerified = await emailVerify(cleanEmail);
  if (isVerified.success === false) {
    return next(new AppError('Invalid email: please use a valid email', 400));
  }

  // 3. Check if patient already exists
  const existingPatient = await Patient.findOne({
    $or: [{ email: cleanEmail }, { phone: cleanPhone }],
  });
  if (existingPatient) {
    return next(
      new AppError('Patient with this email or phone already exists', 400)
    );
  }

  // 4. Check if user exists or create new one
  let user = await User.findOne({
    $or: [{ email: cleanEmail }, { phone: cleanPhone }],
  });

  let defaultPassword;
  if (!user) {
    defaultPassword = cleanPhone; // Using phone as default password

    user = await User.create({
      fullName: `${cleanFirstName} ${cleanLastName}`.trim(),
      email: cleanEmail,
      phone: cleanPhone,
      role: 'user',
      password: defaultPassword,
    });
  }

  // 5. Create new patient
  const newPatient = await Patient.create({
    firstName: cleanFirstName,
    lastName: cleanLastName,
    email: cleanEmail,
    phone: cleanPhone,
    dob,
    gender,
    address,
    user: user._id,
  });

  // 6. Link patient to user
  user.patient = newPatient._id;
  await user.save({ validateBeforeSave: false });

  // 7. Log the action
  await logAction({
    req,
    actor: req.user, // Assuming the current user is creating the patient
    action: 'Patient Created',
    targetType: 'Patient',
    targetId: newPatient._id,
  });

  // 8. Send response
  res.status(201).json({
    status: 'success',
    message: 'Patient created successfully',
    emailStatus: isVerified.message,
    data: {
      patient: {
        id: newPatient._id,
        firstName: newPatient.firstName,
        lastName: newPatient.lastName,
        email: newPatient.email,
      },
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
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
