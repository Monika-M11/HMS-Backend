// src/controllers/doctor.controller.js

const service = require("../services/doctor.service");

exports.getDoctors = async (request, reply) => {

  try {

    const doctors = await service.fetchDoctors(
      request.server.db
    );

    return {
      success: true,
      data: doctors
    };

  } catch (error) {

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: "Failed to fetch doctors"
    });
  }
};

  exports.addDoctor = async (request, reply) => {

  try {

    const body = request.body;

    const result = await service.addDoctor(
      request.server.db,
      body
    );

    return {
      success: true,
      message: "Doctor added successfully",
      data: result
    };

  } catch (error) {

    request.log.error(error);

    return reply.status(500).send({
      success: false,
      message: "Failed to add doctor"
    });

  }
};