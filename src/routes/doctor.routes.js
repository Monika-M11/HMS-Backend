const controller = require("../controllers/doctor.controller");

async function doctorRoutes(fastify, options) {

  fastify.post(
    "/getDoctors",
    controller.getDoctors
  );

  fastify.post(
    "/addDoctor",
    controller.addDoctor
  );

}

module.exports = doctorRoutes;