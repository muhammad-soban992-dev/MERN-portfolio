require('dotenv').config();

function required(name, fallback) {
  const v = process.env[name] || fallback;
  if (v === undefined || v === '') throw new Error(`Missing required env var: ${name}`);
  return v;
}

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';
const DEV_SECRET = 'dev-only-secret-change-me';
const PLACEHOLDERS = [DEV_SECRET, 'change-this-to-a-long-random-secret', 'change-me', 'secret'];

const jwtSecret = process.env.JWT_SECRET || DEV_SECRET;
if (isProd && (jwtSecret.length < 32 || PLACEHOLDERS.includes(jwtSecret))) {
  throw new Error('JWT_SECRET must be a random string of at least 32 characters in production. Generate one with: node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'hex\'))"');
}

const env = {
  port: Number(process.env.PORT || 5000),
  nodeEnv,
  isProd,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sheeza-portfolio',
  jwtSecret,
  // Admin session lifetime in hours (token and cookie share it). Default 24h.
  sessionHours: Math.max(1, Number(process.env.SESSION_HOURS || 24)),
  // Cookies are always Secure in production; COOKIE_SECURE=true forces it elsewhere.
  cookieSecure: isProd || process.env.COOKIE_SECURE === 'true',
  // Cross-site cookie (client and API on different domains) needs SameSite=None + Secure.
  cookieSameSite: process.env.COOKIE_SAMESITE === 'none' ? 'none' : 'lax',
  // Number of reverse proxies in front of the API (Render/Railway = 1). 0 = none (never trust X-Forwarded-For).
  trustProxy: Number(process.env.TRUST_PROXY || 0),
  // One or more allowed browser origins, comma separated.
  clientOrigins: (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map((s) => s.trim()).filter(Boolean),
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  },
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT || 587),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.MAIL_FROM || 'no-reply@example.com',
    to: process.env.MAIL_TO || process.env.ADMIN_EMAIL || '',
  },
  admin: {
    email: process.env.ADMIN_EMAIL || '',
    password: process.env.ADMIN_PASSWORD || '',
    passwordHash: process.env.ADMIN_PASSWORD_HASH || '',
  },
};
module.exports = { env, required };
