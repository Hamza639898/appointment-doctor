// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');


router.post('/payments', paymentController.createPayment);


router.get('/payments/:userId', paymentController.getUserPayments);


router.put('/payments/:id', paymentController.updatePayment);


router.delete('/payments/:id', paymentController.deletePayment);

module.exports = router;
// This code defines the routes for payment-related operations in an Express application.
// It includes routes for creating, retrieving, updating, and deleting payments.
// The routes are linked to the corresponding controller functions that handle the logic for each operation.
