const Appointment = require('./../models/appointmentsModel');
const Patient = require('../models/patientsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAppointments = catchAsync(async (req, res, next) => {
  const appointments = await Appointment.find().populate('patient');

  res.status(200).json({
    status: 'success',
    results: appointments.length,
    data: { appointments },
  });
});

exports.addAppointment = catchAsync(async (req, res, next) => {
  const { patient: patientData, date, doctor, reason } = req.body;

  let patient = await Patient.findOne({
    $or: [{ email: patientData.email }, { phone: patientData.phone }],
  });

  if (!patient) {
    patient = await Patient.create(patientData);
  }

  const appointment = await Appointment.create({
    patient: patient._id,
    date,
    doctor,
    reason,
  });

  res.status(201).json({
    status: 'success',
    data: { appointment },
  });
});

exports.getAppointmentsByPatient = catchAsync(async (req, res, next) => {
  const appointments = await Appointment.find({
    patient: req.params.id,
  }).populate('patient');

  if (!appointments || appointments.length === 0) {
    return next(new AppError('No appointments found for this patient', 404));
  }

  res.status(200).json({
    status: 'success',
    results: appointments.length,
    data: { appointments },
  });
});

exports.deleteAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findByIdAndDelete(req.params.id);

  if (!appointment) {
    return next(new AppError('No appointment found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
