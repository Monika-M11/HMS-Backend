const service = require('../services/medicine.service');

exports.getMedicines = async (request, reply) => {

  try {

    const { pharmacyId } = request.body;

    const medicines = await service.getMedicinesByPharmacy(
      request.server.db,
      pharmacyId
    );

    return {
      success: true,
      data: medicines
    };

  } catch (error) {

    request.log.error(error);

    return reply.status(500).send({
      success: false,
      message: "Failed to fetch medicines"
    });

  }

};