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


exports.addMedicines = async (
  db,
  data
) => {

  const {
    pharmacyId,
    name,
    category,
    price,
    unit,
  } = data;

  const [result] = await db.execute(
    `
    INSERT INTO medicines
    (
      pharmacy_id,
      name,
      category,
      price,
      unit
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      pharmacyId,
      name,
      category,
      price,
      unit,
    ]
  );

  return {
    id: result.insertId,
  };

};

exports.getMedicines = async (
  db,
  pharmacyId
) => {

  const [rows] = await db.execute(
    `
    SELECT
      id,
      name,
      category,
      price,
      unit
    FROM medicines
    WHERE pharmacy_id = ?
    ORDER BY id DESC
    `,
    [pharmacyId]
  );

  return rows;

};