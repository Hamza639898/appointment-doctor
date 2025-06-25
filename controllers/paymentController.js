// controllers/paymentController.js
const Payment = require('../models/paymentModel');

exports.createPayment = (req, res) => {
  const { user_id, appointment_id, transaction_method, status } = req.body;

  const paymentData = {
    user_id,
    appointment_id,
    transaction_method: transaction_method || 'manual',
    status: status || 'paid'
  };

  Payment.createPayment(paymentData, (err, result) => {
    if (err) {
      console.error('Error creating payment:', err);
      return res.status(500).json({ message: 'Payment creation failed' });
    }

    res.status(201).json({ message: 'Payment created successfully', id: result.insertId });
  });
};

exports.getUserPayments = (req, res) => {
  const userId = req.params.userId;

  Payment.getPaymentsByUser(userId, (err, results) => {
    if (err) {
      console.error('Error fetching payments:', err);
      return res.status(500).json({ message: 'Could not fetch payments' });
    }

    res.status(200).json(results);
  });
};

exports.updatePayment = (req, res) => {
  const id = req.params.id;
  const { transaction_method, status } = req.body;

  Payment.updatePayment(id, { transaction_method, status }, (err) => {
    if (err) {
      console.error('Error updating payment:', err);
      return res.status(500).json({ message: 'Update failed' });
    }

    res.status(200).json({ message: 'Payment updated successfully' });
  });
};

exports.deletePayment = (req, res) => {
  const id = req.params.id;

  Payment.deletePayment(id, (err) => {
    if (err) {
      console.error('Error deleting payment:', err);
      return res.status(500).json({ message: 'Deletion failed' });
    }

    res.status(200).json({ message: 'Payment deleted successfully' });
  });
};
