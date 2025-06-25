const express = require('express');
const router = express.Router();
const controller = require('../controllers/appointmentController');
// GET all
router.get('/', controller.getAllAppointments);
// INSERT
router.post('/book', controller.bookAppointment);
// UPDATE by id
router.put('/id', controller.updateAppointment);
// DELETE by id
router.delete('/id', controller.deleteAppointment);

module.exports = router;
