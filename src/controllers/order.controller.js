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


  exports.addPharmacies = async (request, reply) => {

  try {

    const body = request.body;

    const result = await service.addPharmacies(
      request.server.db,
      body
    );

    return {
      success: true,
      message: "Pharmacy added successfully",
      data: result
    };

  } catch (error) {

    request.log.error(error);

    return reply.status(500).send({
      success: false,
      message: "Failed to add Pharmacy"
    });

  }
};