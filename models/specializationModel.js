const db = require('../config/db');

const Specialization = {
  getAll: (callback) => {
    db.query('SELECT * FROM specializations', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM specializations WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    db.query('INSERT INTO specializations SET ?', data, callback);
  },

  update: (id, data, callback) => {
    db.query('UPDATE specializations SET ? WHERE id = ?', [data, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM specializations WHERE id = ?', [id], callback);
  }
};

module.exports = Specialization;
