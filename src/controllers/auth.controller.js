const service = require('../services/auth.service');

exports.sendOtp = async (request, reply) => {
  try {

    const { phone } = request.body;

    await service.sendOtpService(
      request.server.db,
      phone
    );

    return {
      success: true,
      message: 'OTP sent successfully'
    };

  } catch (error) {

    if (error.message === 'USER_NOT_FOUND') {
      return reply.code(404).send({
        success: false,
        message: 'Please register first'
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: 'Failed to send OTP'
    });
  }
};

exports.verifyOtp = async (request, reply) => {
  try {

    const { phone, otp } = request.body;
    console.log("VERIFY OTP BODY:", request.body);

    const result = await service.verifyOtpService(
      request.server.db,
      phone,
      otp,
      request.server
    );

    return {
      success: true,
      message: 'Login successful',
      token: result.token,
      user: result.user
    };

  } catch (error) {

    if (error.message === 'INVALID_OTP') {
      return reply.code(400).send({
        success: false,
        message: 'Invalid OTP'
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: 'OTP verification failed'
    });
  }
};