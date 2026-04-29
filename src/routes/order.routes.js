const controller = require("../controllers/order.controller");

async function pharmacyRoutes(fastify, options) {

  fastify.post(
    "/getPharmacies",
    controller.getPharmacies
  );
}

module.exports = pharmacyRoutes;