const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentsController');
const { protect, restrictTo } = require('./../middleware/protect');

router.use(protect);

router
  .route('/')
  .get(appointmentsController.getAppointments)
  .post(appointmentsController.addAppointment);

router.route('/today').get(appointmentsController.getTodayAppointments);

router.route('/by-date').get(appointmentsController.getAppointmentsByDate);

router
  .route('/patient/:id')
  .get(appointmentsController.getAppointmentsByPatient);

router.route('/my-appointments').get(appointmentsController.getMyAppointments);

router
  .route('/:id/status')
  .patch(appointmentsController.updateAppointmentStatus);

router
  .route('/:id')
  .patch(restrictTo('admin'), appointmentsController.updateAppointment)
  .delete(restrictTo('admin'), appointmentsController.deleteAppointment);

module.exports = router;
