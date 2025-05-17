const Patient = require('./../models/patientsModel');

exports.getPatients = async (req, res) => {
  const patients = await Patient.find();
  res.status(200).json({
    status: 'success',
    results: patients.length,
    data: {
      patients,
    },
  });
};

exports.addPatient = async (req, res) => {
  const newPatient = await Patient.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      patient: newPatient,
    },
  });
};

exports.getSinglePatient = async (req, res) => {
  const patient = await Patient.findById(req.params.id).populate(
    'appointments'
  );

  if (!patient) {
    return res.status(404).json({
      status: 'fail',
      message: 'Patient not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      patient,
    },
  });
};

exports.updatePatient = async (req, res) => {
  const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      patient: patient,
    },
  });
};

exports.deletePatient = async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
