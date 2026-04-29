exports.verifyToken = async (
  request,
  reply
) => {

  try {

    await request.jwtVerify();

  } catch (error) {

    return reply.code(401).send({
      success: false,
      message: 'Unauthorized'
    });
  }
};