const Patient = require('./../models/patientsModel');
const AppError = require('./../utils/appError');

exports.getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find();
    res.status(200).json({
      status: 'success',
      results: patients.length,
      data: {
        patients,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.addPatient = async (req, res, next) => {
  try {
    const newPatient = await Patient.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        patient: newPatient,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getSinglePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id).populate(
      'appointments'
    );

    if (!patient) {
      return next(new AppError('Patient not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        patient,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!patient) {
      return next(new AppError('Patient not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        patient,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      return next(new AppError('Patient not found', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
