// src/controllers/user.controller.js

const service = require('../services/user.service');

exports.addUser = async (request, reply) => {
  try {
    const userData = request.body; //Gets data sent from frontend

    const result = await service.createUser(
      request.server.db,
      userData
    );

    return {
      success: true,
      message: "User created successfully",
      data: result
    };

  } catch (error) {
    request.log.error(error);

    if (error.message === "USER_EXISTS") {
      return reply.code(409).send({
        success: false,
        message: "User already exists"
      });
    }

    return reply.code(500).send({
      success: false,
      message: "Internal Server Error"
    });
  }
};