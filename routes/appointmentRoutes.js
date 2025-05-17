const express = require('express');
const router = express.Router();
const {
  getAppointments,
  addAppointment,
  getAppointmentsByPatient,
  deleteAppointment,
} = require('../controllers/appointmentsController');

router.route('/').get(getAppointments).post(addAppointment);
router.get('/patient/:id', getAppointmentsByPatient);
router.delete('/:id', deleteAppointment);

module.exports = router;
