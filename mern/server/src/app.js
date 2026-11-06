const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const { env } = require('./config/env');
const apiRoutes = require('./routes');
const { notFound, errorHandler } = require('./middleware/error');
const { apiLimiter } = require('./middleware/rateLimit');
const originCheck = require('./middleware/originCheck');

const app = express();
app.disable('x-powered-by');
// Only trust X-Forwarded-For when really behind a proxy (TRUST_PROXY=1); otherwise attackers could spoof IPs and dodge rate limits.
app.set('trust proxy', env.trustProxy);
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin(origin, cb) {
    if (!origin || env.clientOrigins.includes(origin)) return cb(null, true);
    return cb(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  maxAge: 600,
}));
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false, limit: '100kb' }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(hpp());
app.get('/api/v1/health', (_req, res) => res.json({ success: true, data: { status: 'ok' }, message: 'API is running.' }));
app.get('/api/health', (_req, res) => res.json({ success: true, data: { status: 'ok' }, message: 'API is running.' }));
app.use('/api/v1', apiLimiter, originCheck, apiRoutes);
app.use(notFound);
app.use(errorHandler);
module.exports = app;
