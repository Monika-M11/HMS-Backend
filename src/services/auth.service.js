const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.sendOtpService = async (db, phone) => {

  // CHECK USER EXISTS
  const [users] = await db.query(
    'SELECT * FROM users WHERE phone = ?',
    [phone]
  );

  if (users.length === 0) {
    throw new Error('USER_NOT_FOUND');
  }

  // SEND OTP
  const response = await client.verify.v2
    .services(process.env.TWILIO_SERVICE_SID)
    .verifications.create({
      to: `+91${phone}`,
      channel: 'sms'
    });

  return response;
};


exports.verifyOtpService = async (
  db,
  phone,
  otp,
  fastify
) => {

console.log("PHONE RECEIVED:", phone);
console.log("OTP RECEIVED:", otp);

  const verificationCheck = await client.verify.v2 //This contacts Twilio servers.
    .services(process.env.TWILIO_SERVICE_SID)
    .verificationChecks.create({
      to: `+91${phone}`,
      code: otp
    });

  if (verificationCheck.status !== 'approved') {
    throw new Error('INVALID_OTP');
  }

  // GET USER
  const [users] = await db.query(
    'SELECT * FROM users WHERE phone = ?',
    [phone]
  );

  const user = users[0];

  // GENERATE JWT
  const token = fastify.jwt.sign({
    userId: user.id,
    phone: user.phone
  });

  return {
    token,
    user
  };
};
