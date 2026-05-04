// src/services/doctor.service.js

exports.fetchDoctors = async (db) => {

  const [rows] = await db.query(`
    SELECT * FROM doctors
    ORDER BY id DESC
  `);

  return rows;
};


//ADD DOCTOR
exports.addDoctor = async (db, doctorData) => {

  const {
    name,
    specialty,
    hospital,
    address
  } = doctorData;

  // Get latest accent index
  const [accentRows] = await db.query(`
    SELECT MAX(accentIndex) AS maxAccent
    FROM doctors
  `);

  const nextAccentIndex =
    accentRows[0]?.maxAccent !== null
      ? accentRows[0].maxAccent + 1
      : 0;

  const [result] = await db.query(
    `
    INSERT INTO doctors
    (
      name,
      specialty,
      hospital,
      address,
      rating,
      reviews,
      available,
      accentIndex
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      name,
      specialty,
      hospital,
      address,
      0,
      0,
      1,
      nextAccentIndex
    ]
  );

  return {
    id: result.insertId,
    ...doctorData,
    rating: 0,
    reviews: 0,
    available: true,
    accentIndex: nextAccentIndex
  };

};