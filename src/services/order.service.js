exports.fetchPharmacies = async (db) => {

  const [rows] = await db.query(`
  
    SELECT *
    FROM pharmacies
    ORDER BY id DESC

  `);

  return rows;
};


exports.addPharmacies = async (db, pharmacyData) => {

  const {
    name,
    place,
    timing,
    rating,
    reviews,
    delivery,
    latitude,
    longitude
  } = pharmacyData;

  // Get current max accent index
  const [accentRows] = await db.query(`
    SELECT MAX(accentIndex) AS maxAccent
    FROM pharmacies
  `);

  const nextAccentIndex =
    accentRows[0]?.maxAccent !== null
      ? accentRows[0].maxAccent + 1
      : 0;

  const [result] = await db.query(
    `
    INSERT INTO pharmacies
    (
      name,
      place,
      timing,
      rating,
      reviews,
      delivery,
      accentIndex,
      latitude,
      longitude
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      name,
      place,
      timing,
      rating || 0,
      reviews || 0,
      delivery || "Free Delivery",
      nextAccentIndex,
      latitude,
      longitude
    ]
  );

  return {
    id: result.insertId,
    ...pharmacyData,
    accentIndex: nextAccentIndex
  };

};