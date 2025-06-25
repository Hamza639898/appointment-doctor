// models/paymentModel.js
const db = require('../config/db');

exports.createPayment = (data, callback) => {
  const sql = `
    INSERT INTO payments (user_id, appointment_id, transaction_method, status)
    VALUES (?, ?, ?, ?)
  `;
  const values = [
    data.user_id,
    data.appointment_id,
    data.transaction_method || 'manual',
    data.status || 'paid'
  ];
  db.query(sql, values, callback);
};

exports.getPaymentsByUser = (userId, callback) => {
  const sql = `SELECT * FROM payments WHERE user_id = ?`;
  db.query(sql, [userId], callback);
};

exports.updatePayment = (id, data, callback) => {
  const sql = `
    UPDATE payments
    SET transaction_method = ?, status = ?
    WHERE id = ?
  `;
  db.query(sql, [data.transaction_method, data.status, id], callback);
};

exports.deletePayment = (id, callback) => {
  const sql = `DELETE FROM payments WHERE id = ?`;
  db.query(sql, [id], callback);
};
