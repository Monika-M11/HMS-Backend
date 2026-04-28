exports.createUser = async (db, userData) => {
  const {
    name,
    phone,
    gender,
    dob,
    address,
    state,
    pincode
  } = userData;

  // optional: prevent duplicate phone
  const [existing] = await db.query(
    'SELECT id FROM users WHERE phone = ?',
    [phone]
  );

  if (existing.length > 0) {
    throw new Error("USER_EXISTS");
  }

  const [result] = await db.query(
    `INSERT INTO users 
    (name, phone, gender, dob, address, state, pincode) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, phone, gender, dob, address, state, pincode]
  );

  return {
    id: result.insertId,
    name,
    phone
  };
};