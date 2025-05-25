const Appointment = require('./../models/appointmentsModel');
const Patient = require('../models/patientsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { getStartAndEndOfDay } = require('../utils/date');

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

  if (!patientData.email && !patientData.phone) {
    return next(
      new AppError('Email or phone is required to identify patient', 400)
    );
  }

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

exports.updateAppointment = catchAsync(async (req, res, next) => {
  const updatedAppointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedAppointment) {
    return next(new AppError('Appointment not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      appointment: updatedAppointment,
    },
  });
});

exports.getTodayAppointments = catchAsync(async (req, res, next) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const appointments = await Appointment.find({
    date: { $gte: startOfDay, $lte: endOfDay },
  }).populate('patient');

  if (appointments.length === 0)
    return next(new AppError('No Appointtments found today', 404));

  res.status(200).json({
    status: 'success',
    results: appointments.length,
    data: {
      appointments,
    },
  });
});

exports.getAppointmentsByDate = catchAsync(async (req, res, next) => {
  const { date } = req.query;

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return next(
      new AppError('Invalid or missing date. Format: YYYY-MM-DD', 400)
    );
  }

  const { start, end } = getStartAndEndOfDay(date);
  const appointments = await Appointment.find({
    date: { $gte: start, $lte: end },
  }).populate('patient');

  if (appointments.length === 0)
    return next(
      new AppError(`No Appointment found by this date: ${date}`, 404)
    );

  res.status(200).json({
    status: 'success',
    results: appointments.length,
    data: {
      appointments,
    },
  });
});
