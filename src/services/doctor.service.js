// src/services/doctor.service.js

exports.fetchDoctors = async (db) => {

  const [rows] = await db.query(`
    SELECT * FROM doctors
    ORDER BY id DESC
  `);

  return rows;
};