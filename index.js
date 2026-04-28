// index.js (root level)

const app = require('./src/app');

const start = async () => {
  try {
    const PORT = process.env.PORT || 3000;

    await app.listen({
      port: PORT,
      host: '0.0.0.0' // important if you test on mobile / network
    });

    console.log(`Server running on http://localhost:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();