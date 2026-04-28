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
}

module.exports = routes;