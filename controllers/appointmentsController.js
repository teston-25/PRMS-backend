const Appointment = require('./../models/appointmentsModel');
const Patient = require('../models/patientsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../middleware/catchAsync');
const { getStartAndEndOfDay } = require('../utils/date');
const logAction = require('../utils/logAction');
const User = require('../models/userModel');

/* ================= Role Matrix =================

Handler	                    Admin	Staff	Doctor  User (patient)
|-------------------------|:----:|:--:|:----:|:--------:|
getAppointments	            ✔     ✔    ✖     	✖
getAppointmentById          ✔     ✔    ✖      ✖
addAppointment	            ✔	    ✔	   ✖	    ✖
deleteAppointment	          ✔	    ✔	   ✖	    ✖
updateAppointment	          ✔	    ✔	   ✖	    ✖
getTodayAppointments	      ✔    	✔	   ✖	    ✖
getAppointmentsByDate	      ✔	    ✔	   ✖	    ✖
getAppointmentsByPatient	  ✔	    ✔	   ✖	    ✔ 
getMyAppointments	          ✖	    ✔	   ✔	    ✖
updateAppointmentStatus	    ✖	    ✖	   ✔ 	    ✖
getTodayMyAppointments	    ✖	    ✔	   ✔	    ✖
================================================= */

exports.getAppointments = catchAsync(async (req, res, next) => {
  const appointments = await Appointment.find()
    .populate('patient')
    .populate('assignedTo');

  res.status(200).json({
    status: 'success',
    results: appointments.length,
    data: { appointments },
  });
});

exports.addAppointment = catchAsync(async (req, res, next) => {
  const { patient: patientData, date, assignedTo, reason } = req.body;

  if (!patientData.email && !patientData.phone) {
    return next(
      new AppError('Email or phone is required to identify patient', 400)
    );
  }

  const user = await User.findById(assignedTo);
  if (!user || user.role !== 'doctor') {
    return next(new AppError('Assigned user must have a doctor role', 400));
  }

  const appointmentDate = new Date(date);
  const startOfDay = new Date(appointmentDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(appointmentDate.setHours(23, 59, 59, 999));

  const existingCount = await Appointment.countDocuments({
    assignedTo,
    date: { $gte: startOfDay, $lte: endOfDay },
  });

  const MAX_DAILY_APPOINTMENTS = 30;
  if (existingCount >= MAX_DAILY_APPOINTMENTS) {
    return next(
      new AppError('This doctor already has 30 appointments on this day.', 400)
    );
  }

  let patient = await Patient.findOne({
    $or: [
      { email: patientData.email?.toLowerCase() },
      { phone: patientData.phone },
    ],
  });

  if (!patient) {
    patient = await Patient.create({
      ...patientData,
      email: patientData.email?.toLowerCase(),
    });
  }

  const appointment = await Appointment.create({
    patient: patient._id,
    date,
    assignedTo,
    reason,
  }).then((doc) => doc.populate([{ path: 'patient' }, { path: 'assignedTo' }]));

  await logAction({
    req,
    action: 'Add appointment',
    targetType: 'Patient',
    targetId: patient._id,
    details: { newPatient: patient.email || patient.phone },
  });

  res.status(201).json({
    status: 'success',
    data: {
      appointment,
    },
  });
});

exports.deleteAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findByIdAndDelete(req.params.id);

  if (!appointment) {
    return next(new AppError('No appointment found with that ID', 404));
  }

  await logAction({
    req,
    action: 'Delete appointment',
    targetType: 'Appointment',
    targetId: appointment._id,
    details: { deletedAppointmentId: appointment._id },
  });

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

  await logAction({
    req,
    action: 'Update Appointment',
    targetType: 'Appointment',
    targetId: updatedAppointment._id,
    details: { updatedAppointment: req.body },
  });

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
  })
    .populate('patient')
    .populate('assignedTo');

  // if (appointments.length === 0)
  //   return next(new AppError('No Appointments found today', 404));

  res.status(200).json({
    status: 'success',
    results: appointments.length,
    data: { appointments },
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
  })
    .populate('patient')
    .populate('assignedTo');

  if (appointments.length === 0)
    return next(
      new AppError(`No Appointments found by this date: ${date}`, 404)
    );

  res.status(200).json({
    status: 'success',
    results: appointments.length,
    data: { appointments },
  });
});

exports.getAppointmentsByPatient = catchAsync(async (req, res, next) => {
  const appointments = await Appointment.find({
    patient: req.params.id,
  })
    .populate('patient')
    .populate('assignedTo');

  if (!appointments || appointments.length === 0) {
    return next(new AppError('No appointments found for this patient', 404));
  }

  res.status(200).json({
    status: 'success',
    results: appointments.length,
    data: { appointments },
  });
});

exports.getMyAppointments = catchAsync(async (req, res, next) => {
  const appointments = await Appointment.find({
    assignedTo: req.user._id,
  })
    .populate('patient')
    .populate('assignedTo');

  res.status(200).json({
    status: 'success',
    results: appointments.length,
    data: { appointments },
  });
});

exports.updateAppointmentStatus = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) return next(new AppError('No appointment found', 404));

  if (appointment.assignedTo.toString() !== req.user._id.toString()) {
    return next(
      new AppError('You are not authorized to update this appointment', 403)
    );
  }

  appointment.status = req.body.status || appointment.status;
  await appointment.save();

  await logAction({
    req,
    action: 'Update Appointment Status',
    targetType: 'Appointment',
    targetId: appointment._id,
    details: { newStatus: req.body.status },
  });

  res.status(200).json({
    status: 'success',
    data: { appointment },
  });
});

exports.getTodayMyAppointments = catchAsync(async (req, res, next) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const appointments = await Appointment.find({
    assignedTo: req.user._id,
    date: { $gte: startOfDay, $lte: endOfDay },
  })
    .populate('patient')
    .populate('assignedTo')
    .limit(10);

  // if (!appointments.length)
  //   return next(new AppError('No appointments for you today', 404));

  res.status(200).json({
    status: 'success',
    results: appointments.length,
    data: { appointments },
  });
});

exports.getAppointmentById = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id)
    .populate('patient')
    .populate('assignedTo');

  if (!appointment) {
    return next(new AppError('No appointment found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { appointment },
  });
});
