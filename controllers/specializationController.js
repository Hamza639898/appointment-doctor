const Specialization = require('../models/specializationModel');

exports.getAll = (req, res) => {
  Specialization.getAll((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

exports.getById = (req, res) => {
  Specialization.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ message: 'Not found' });
    res.json(result[0]);
  });
};

exports.create = (req, res) => {
  Specialization.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Created successfully', id: result.insertId });
  });
};

exports.update = (req, res) => {
  Specialization.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Updated successfully' });
  });
};

exports.delete = (req, res) => {
  Specialization.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Deleted successfully' });
  });
};
