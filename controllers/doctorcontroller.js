const bcrypt = require('bcrypt');
const Doctor = require('../models/doctormodel');

exports.createDoctor = async (req, res) => {
  try {
    if (!req.body.password)
      return res.status(400).json({ error: 'Password is required' });

    const hashed = await bcrypt.hash(req.body.password, 10);
    const doctor  = { ...req.body, password: hashed };

    const id = await Doctor.create(doctor);
    res.status(201).json({ message: 'Doctor created', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllDoctors = async (_req, res) => {
  try {
    const docs = await Doctor.findAll();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.password) data.password = await bcrypt.hash(data.password, 10);

    const ok = await Doctor.updateById(req.params.id, data);
    if (!ok) return res.status(404).json({ error: 'Doctor not found' });

    res.json({ message: 'Updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const ok = await Doctor.remove(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Doctor not found' });

    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchDoctors = async (req, res) => {
  try {
    const rows = await Doctor.search(req.query.q || '');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};