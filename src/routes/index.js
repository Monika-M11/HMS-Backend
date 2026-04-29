// src/routes/index.js


async function routes(fastify, options) {

  // Health check
  fastify.get('/', async () => {
    return { message: "API running" };
  });

  // Register user routes
  fastify.register(require('./user.routes'), {
    prefix: '/users'
  });

    fastify.register(require('./auth.routes'), {
    prefix: '/auth'
  });

fastify.register(require('./doctor.routes'), {
  prefix: '/doctors'
});

fastify.register(require('./order.routes'),{
  prefix: '/pharmacies'
});

fastify.register(require('./medicine.routes'), {
  prefix: '/medicines'
});
}

module.exports = routes;