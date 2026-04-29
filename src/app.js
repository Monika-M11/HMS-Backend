// src/app.js

const fastify = require('fastify');
require('dotenv').config();

// create instance
const app = fastify({
  logger: true
});

// plugins
const cors = require('@fastify/cors');
const dbPlugin = require('./plugins/db.plugin');


// routes
const routes = require('./routes');

// --------------------
// Register Plugins
// --------------------
app.register(cors, {
  origin: true // Allow requests from any origin
});

// DB connection (decorates app with app.db)
app.register(dbPlugin);

app.register(require('./plugins/jwt.plugin'));

// --------------------
// Register Routes
// --------------------
app.register(routes);



// --------------------
// Global Error Handler (important)
// --------------------
app.setErrorHandler((error, request, reply) => {
  request.log.error(error);

  // custom error handling
  if (error.message === "User already exists") {
    return reply.code(409).send({
      success: false,
      message: error.message
    });
  }

  reply.code(500).send({
    success: false,
    message: "Internal Server Error"
  });
});

 

// export app
module.exports = app;