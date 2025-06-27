const db = require('../config/db');

/* ➕  Insert */
exports.create = async (doctor) => {
  const sql = `
    INSERT INTO doctors
    (full_name, phone_number, username, password,
     availability, ticket_price, specialization_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const [result] = await db.execute(sql, [
    doctor.full_name,
    doctor.phone_number,
    doctor.username,
    doctor.password,            // shaandheynta (hash) waxa loo sameeyaa Controller-ka
    doctor.availability ?? 1,
    doctor.ticket_price,
    doctor.specialization_id
  ]);
  return result.insertId;
};

/* 📄  Get all */
exports.findAll = async () => {
  const [rows] = await db.execute(`
    SELECT id, full_name, phone_number, username,
           availability, ticket_price, specialization_id, created_at
    FROM doctors
  `);
  return rows;
};

/* 🔄  Update  */
exports.updateById = async (id, data) => {
  const fields = [
    'full_name', 'phone_number', 'username',
    'password', 'availability', 'ticket_price', 'specialization_id'
  ];

  // dhis SET clause dynamic ah
  const setClause = fields
    .filter(k => k in data)
    .map(k => `${k} = ?`)
    .join(', ');

  const values = fields.filter(k => k in data).map(k => data[k]);
  values.push(id);

  const sql = `UPDATE doctors SET ${setClause} WHERE id = ?`;
  const [result] = await db.execute(sql, values);
  return result.affectedRows;
};

/* ❌  Delete */
exports.remove = async (id) => {
  const [result] = await db.execute('DELETE FROM doctors WHERE id = ?', [id]);
  return result.affectedRows;
};

/* 🔍  Search */
exports.search = async (q) => {
  const like = `%${q}%`;
  const [rows] = await db.execute(`
    SELECT * FROM doctors
     WHERE full_name LIKE ? OR username LIKE ?
  `, [like, like]);
  return rows;
};