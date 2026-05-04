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


exports.addMedicines = async (
  request,
  reply
) => {

  try {

    const body = request.body;

    const result =
      await service.addMedicines(
        request.server.db,
        body
      );

    return {
      success: true,
      message:
        "Medicine added successfully",
      data: result,
    };

  } catch (error) {

    console.log(
      "ADD MEDICINE ERROR:",
      error
    );

    reply.code(500);

    return {
      success: false,
      message:
        "Failed to add medicine",
    };

  }

};


