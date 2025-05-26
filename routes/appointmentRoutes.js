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
router
  .route('/today')
  .get(protect, appointmentsController.getTodayAppointments);
router
  .route('/:id')
  .patch(protect, appointmentsController.updateAppointment)
  .delete(protect, appointmentsController.deleteAppointment);
router
  .route('/by-date')
  .get(protect, appointmentsController.getAppointmentsByDate);

module.exports = router;
