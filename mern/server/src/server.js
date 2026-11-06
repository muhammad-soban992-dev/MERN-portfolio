const app = require('./app');
const connectDB = require('./config/db');
const { env } = require('./config/env');
const logger = require('./utils/logger');

// The HTTP server always starts so /api/v1/health can answer even while
// MongoDB is unreachable. DB-backed routes return a 500 JSON error until
// the database is up; the connection is retried in the background.
async function start() {
  app.listen(env.port, () => logger.info(`API listening on http://localhost:${env.port} (${env.nodeEnv})`));
  try {
    await connectDB();
  } catch (err) {
    logger.error('MongoDB connection failed:', err.message);
    logger.error('Start MongoDB (or set MONGODB_URI to a reachable Atlas cluster). DB-backed routes will return errors until it connects.');
    const retry = setInterval(async () => {
      try { await connectDB(); logger.info('MongoDB connected on retry.'); clearInterval(retry); }
      catch (_e) { /* keep retrying silently */ }
    }, 10000);
    retry.unref();
  }
}
process.on('unhandledRejection', (reason) => { logger.error('Unhandled promise rejection:', reason && reason.stack ? reason.stack : reason); });
process.on('uncaughtException', (err) => { logger.error('Uncaught exception:', err && err.stack ? err.stack : err); process.exit(1); });
start();
