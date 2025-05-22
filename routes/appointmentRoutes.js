const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentsController');
const protect = require('./../middleware/protect');

router
  .route('/')
  .get(protect, appointmentsController.getAppointments)
  .post(protect, appointmentsController.addAppointment);
router.get(
  '/patient/:id',
  protect,
  appointmentsController.getAppointmentsByPatient
);
router.delete('/:id', protect, appointmentsController.deleteAppointment);

module.exports = router;
