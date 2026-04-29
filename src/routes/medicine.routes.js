const controller = require('../controllers/medicine.controller');

async function pharmacyRoutes(fastify, options) {

  fastify.post(
    '/getMedicines',
    controller.getMedicines
  );

}

module.exports = pharmacyRoutes;