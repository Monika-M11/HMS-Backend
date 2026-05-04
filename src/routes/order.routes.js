const controller = require("../controllers/order.controller");

async function pharmacyRoutes(fastify, options) {

  fastify.post(
    "/getPharmacies",
    controller.getPharmacies
  );

    fastify.post(
    "/addPharmacies",
    controller.addPharmacies
  );
}

module.exports = pharmacyRoutes;