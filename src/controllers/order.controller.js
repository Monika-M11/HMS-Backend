const service = require("../services/order.service");

exports.getPharmacies = async (request, reply) => {

  try {

    const pharmacies = await service.fetchPharmacies(
      request.server.db
    );

    return {
      success: true,
      data: pharmacies
    };

  } catch (error) {

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: "Failed to fetch pharmacies"
    });
  }
};