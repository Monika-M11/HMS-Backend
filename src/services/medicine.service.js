exports.getMedicinesByPharmacy = async (db, pharmacyId) => {

  const [rows] = await db.query(
    `
    SELECT *
    FROM medicines
    WHERE pharmacy_id = ?
    `,
    [pharmacyId]
  );

  return rows;
};