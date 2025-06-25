const db = require('../db');

exports.getAllAppointments = (req, res) => {
  db.query('SELECT * FROM appointments', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
});
};

exports.bookAppointment = (req, res) => {
    const { user_id, doctor_id, appointment_date } = req.body;

    db.query(
    'SELECT ticket_price FROM doctors WHERE id = ?',
    [doctor_id],
    (err, results) => {
    if (err || results.length === 0) return res.status(400).send('Invalid doctor');

    const ticket_price = results[0].ticket_price;
    const sql = `INSERT INTO appointments (user_id, doctor_id, appointment_date, ticket_price) VALUES (?, ?, ?, ?)`;
    

    db.query(sql, [user_id, doctor_id, appointment_date, ticket_price], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ message: 'Appointment booked', appointment_id: result.insertId });
});
    }
);
};


// ✅ UPDATE appointment (e.g., status or date)
exports.updateAppointment = (req, res) => {
    const { id } = req.params;
    const { appointment_date, status } = req.body;

    const sql = `
    UPDATE appointments SET appointment_date = ?, status = ? WHERE id = ?
    `;

    db.query(sql, [appointment_date, status, id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send('Appointment not found');
    res.json({ message: 'Appointment updated successfully' });
    });
};

  // ✅ DELETE appointment
exports.deleteAppointment = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM appointments WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send('Appointment not found');
    res.json({ message: 'Appointment deleted successfully' });
    });
};