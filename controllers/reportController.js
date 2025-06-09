const Appointment = require('../models/appointmentsModel');
const Patient = require('../models/patientsModel');
const History = require('../models/historyModel');
const AppError = require('../utils/appError');
const catchAsync = require('../middleware/catchAsync');

/**============================ Role matrix =====================
 Handler	                          User	Doctor	Staff	Admin
 |-------------------------------|:-----:|:----:|:----:|:------------:|
 Get Summary Report	                ✘	    ✔	      ✔	    ✔
 Get Appointments By Date Range	    ✘	    ✔	      ✔	    ✔
 Get Frequent Diagnoses	            ✘	    ✔	      ✔	    ✔
================================================================= */

exports.getSummaryReport = catchAsync(async (req, res, next) => {
  const totalPatients = await Patient.countDocuments();
  const totalAppointments = await Appointment.countDocuments();

  const latestAppointments = await Appointment.find()
    .sort({ date: -1 })
    .limit(5)
    .populate('patient');

  res.status(200).json({
    status: 'success',
    data: {
      totalPatients,
      totalAppointments,
      recentAppointments: latestAppointments,
    },
  });
});

exports.getAppointmentsByDateRange = catchAsync(async (req, res, next) => {
  const { from, to } = req.query;

  if (!from || !to)
    return next(new AppError('Please provide both from and to dates', 400));

  const start = new Date(from);
  const end = new Date(to);
  end.setHours(23, 59, 59, 999);

  const appointments = await Appointment.find({
    date: { $gte: start, $lte: end },
  }).populate('patient');

  res.status(200).json({
    status: 'success',
    results: appointments.length,
    data: {
      appointments,
    },
  });
});

exports.getFrequentDiagnoses = catchAsync(async (req, res, next) => {
  const topDiagnoses = await History.aggregate([
    {
      $group: {
        _id: '$diagnosis',
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      topDiagnoses,
    },
  });
});
