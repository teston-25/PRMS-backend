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

exports.getAppointmentsByPatient = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.params.id,
    }).populate('patient');
    res.status(200).json({
      status: 'success',
      results: appointments.length,
      data: {
        appointments,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteAppointment = async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
