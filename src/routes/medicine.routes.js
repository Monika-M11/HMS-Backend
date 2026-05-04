const controller = require('../controllers/medicine.controller');

async function pharmacyRoutes(fastify, options) {

  fastify.post(
    '/getMedicines',
    controller.getMedicines
  );

    fastify.post(
    '/addMedicines',
    controller.addMedicines
  );

}

module.exports = pharmacyRoutes;