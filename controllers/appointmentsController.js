// Dummy array to simulate DB for now
const appointments = [];

// GET /appointments - Get all appointments
exports.getAllAppointments = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: appointments.length,
    data: {
      appointments,
    },
  });
};

// POST /appointments - Add a new appointment
exports.createAppointment = (req, res) => {
  const newAppointment = {
    id: Date.now().toString(), // Just a dummy unique ID
    ...req.body,
  };
  appointments.push(newAppointment);

  res.status(201).json({
    status: 'success',
    data: {
      appointment: newAppointment,
    },
  });
};

// GET /appointments/patient/:id - Get appointments by patient ID
exports.getAppointmentsByPatient = (req, res) => {
  const patientId = req.params.id;
  const filtered = appointments.filter((app) => app.patientId === patientId);

  res.status(200).json({
    status: 'success',
    results: filtered.length,
    data: {
      appointments: filtered,
    },
  });
};

// DELETE /appointments/:id - Delete an appointment by ID
exports.deleteAppointment = (req, res) => {
  const appointmentId = req.params.id;
  const index = appointments.findIndex((app) => app.id === appointmentId);

  if (index === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Appointment not found',
    });
  }

  appointments.splice(index, 1);

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
