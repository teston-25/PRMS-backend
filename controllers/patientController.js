const patients = [];

// GET all patients
exports.getPatients = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: patients.length,
    data: {
      patients,
    },
  });
};

// POST - add new patient
exports.addPatient = (req, res) => {
  const newPatient = {
    id: Date.now().toString(), // unique ID
    ...req.body,
  };

  patients.push(newPatient);

  res.status(201).json({
    status: 'success',
    data: {
      patient: newPatient,
    },
  });
};

// GET single patient by ID
exports.getSinglePatient = (req, res) => {
  const patient = patients.find((p) => p.id === req.params.id);

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

// PATCH - update patient
exports.updatePatient = (req, res) => {
  const index = patients.findIndex((p) => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Patient not found',
    });
  }

  patients[index] = { ...patients[index], ...req.body };

  res.status(200).json({
    status: 'success',
    data: {
      patient: patients[index],
    },
  });
};

// DELETE - remove patient
exports.deletePatient = (req, res) => {
  const index = patients.findIndex((p) => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Patient not found',
    });
  }

  patients.splice(index, 1);

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
