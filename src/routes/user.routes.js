// // src/routes/user.routes.js

// const controller = require('../controllers/user.controller');

// async function userRoutes(fastify, options) {

//   // POST → /users/addUser
// fastify.post('/addUser', {
//   schema: {
//     body: {
//       type: 'object',
//       required: ['name', 'phone'],
//       properties: {
//         name: { type: 'string' },
//         phone: { type: 'string' },
//         gender: { type: 'string' },
//         dob: { type: 'string' },
//         address: { type: 'string' },
//         state: { type: 'string' },
//         pincode: { type: 'string' }
//       }
//     }
//   }
// }, controller.addUser);

// }

// module.exports = userRoutes;


const controller = require('../controllers/user.controller');

const {
  verifyToken
} = require('../middleware/auth.middleware');

async function userRoutes(fastify, options) {

  // REGISTER USER
  fastify.post('/addUser', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'phone'],
        properties: {
          name: { type: 'string' },
          phone: { type: 'string' },
          gender: { type: 'string' },
          dob: { type: 'string' },
          address: { type: 'string' },
          age: { type: 'string' },
          state: { type: 'string' },
          pincode: { type: 'string' }
        }
      }
    }
  }, controller.addUser);

  // PROTECTED PROFILE ROUTE
  fastify.get(
    '/profile',
    {
      preHandler: [verifyToken]
    },
    async (request, reply) => {

      return {
        success: true,
        user: request.user
      };
    }
  );

}

module.exports = userRoutes;