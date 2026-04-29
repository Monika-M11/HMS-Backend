exports.fetchPharmacies = async (db) => {

  const [rows] = await db.query(`
  
    SELECT *
    FROM pharmacies
    ORDER BY id DESC

  `);

  return rows;
};