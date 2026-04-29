const controller = require('../controllers/auth.controller');

async function authRoutes(fastify, options) {

  fastify.post('/send-otp', controller.sendOtp);

  fastify.post('/verify-otp', controller.verifyOtp);
}

module.exports = authRoutes;