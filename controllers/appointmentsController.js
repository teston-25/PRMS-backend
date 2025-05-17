const Appointment = require('./../models/appointmentsModel');
const Patient = require('../models/patientsModel');

exports.getAppointments = async (req, res) => {
  const appointments = await Appointment.find().populate('patient');
  res.status(200).json({
    status: 'success',
    results: appointments.length,
    data: {
      appointments,
    },
  });
};

exports.addAppointment = async (req, res) => {
  try {
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
      data: {
        appointment,
      },
    });
  } catch (err) {
    console.log(`error: ${err}`);
  }
};

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
