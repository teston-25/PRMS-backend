const Invoice = require('../models/invoiceModel');
const History = require('../models/historyModel');
const catchAsync = require('../middleware/catchAsync');
const AppError = require('../utils/appError');

/** ================= Role Matrix =================
   Handler           Admin  Staff  Doctor  User 
  |----------------|:-----:|:-----:|:------:|:----:|
  createinvoice       ✖       ✖      ✔      ✖   
  markInvoiceAsPaid   ✔       ✔      ✖      ✖   
  ================================================= */

exports.getInvoices = catchAsync(async (req, res, next) => {
  const user = req.user;

  let filter = {};

  if (user.role === 'doctor') {
    filter.createdBy = user._id;
  }

  if (user.role === 'user') {
    filter.patient = user.patient;
  }
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skip = (page - 1) * limit;

  const total = await Invoice.countDocuments(filter);
  const invoices = await Invoice.find(filter)
    .populate({
      path: 'patient',
      select: 'firstName lastName email phone',
      options: { virtuals: false },
    })
    .populate('medicalHistory', 'diagnosis treatment date')
    .populate('issuedBy', 'fullName email role')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    status: 'success',
    results: invoices.length,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    data: invoices,
  });
});

exports.createInvoice = catchAsync(async (req, res, next) => {
  const { patient, medicalHistory, services, totalAmount } = req.body;
  const invoice = await Invoice.create({
    patient,
    medicalHistory,
    services,
    totalAmount,
    issuedBy: req.user._id,
  });

  await History.findByIdAndUpdate(medicalHistory, {
    billingStatus: 'pending',
  });

  res.status(201).json({
    status: 'success',
    data: invoice,
  });
});

exports.markInvoiceAsPaid = catchAsync(async (req, res, next) => {
  const invoice = await Invoice.findById(req.params.id);

  if (!invoice) {
    return next(new AppError('Invoice not found', 404));
  }

  if (invoice.status === 'paid') {
    return next(new AppError('Invoice already marked as paid', 400));
  }

  invoice.status = 'paid';
  await invoice.save();

  const updatedHistory = await History.findByIdAndUpdate(
    invoice.medicalHistory,
    { billingStatus: 'paid' },
    { new: true },
  );

  if (!updatedHistory) {
    return next(new AppError('Associated medical history not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Invoice and billing status updated',
    data: {
      invoice,
      medicalHistory: updatedHistory,
    },
  });
});

exports.getPatientInvoices = catchAsync(async (req, res, next) => {
  const { patientId } = req.params;

  const invoices = await Invoice.find({ patient: patientId })
    .populate({
      path: 'patient',
      select: 'firstName lastName email phone',
      options: { virtuals: false },
    })
    .populate('medicalHistory', 'diagnosis treatment date')
    .populate('issuedBy', 'fullName email role')
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: invoices.length,
    data: invoices,
  });
});

exports.getInvoiceById = catchAsync(async (req, res, next) => {
  const invoice = await Invoice.findById(req.params.id)
    .populate({
      path: 'patient',
      select: 'firstName lastName email phone',
      options: { virtuals: false },
    })
    .populate('medicalHistory', 'diagnosis treatment date')
    .populate('issuedBy', 'fullName email role');

  if (!invoice) {
    return next(new AppError('Invoice not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: invoice,
  });
});
