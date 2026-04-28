// src/plugins/db.plugin.js

const fp = require('fastify-plugin');
const mysql = require('mysql2/promise');

async function dbPlugin(fastify, options) {
  try {
    // Create MySQL connection pool (better than single connection)
    const pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Test connection
    const connection = await pool.getConnection();
    console.log('✅ MySQL Connected');
    connection.release();

    // Decorate Fastify instance
    fastify.decorate('db', pool);

    // Graceful shutdown
    fastify.addHook('onClose', async (instance, done) => {
      await pool.end();
      done();
    });

  } catch (error) {
    fastify.log.error('❌ DB Connection Failed:', error);
    process.exit(1);
  }
}

module.exports = fp(dbPlugin);