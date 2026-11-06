const rateLimit = require('express-rate-limit');

const base = { standardHeaders: 'draft-7', legacyHeaders: false };
const apiLimiter = rateLimit({ ...base, windowMs: 15 * 60 * 1000, max: 300, message: { success: false, message: 'Too many requests. Please slow down.' } });
const messageLimiter = rateLimit({ ...base, windowMs: 15 * 60 * 1000, max: 5, message: { success: false, message: 'Too many messages sent. Please try again in 15 minutes.' } });
// Only FAILED logins count, so normal use never locks the owner out but brute force is stopped.
const authLimiter = rateLimit({ ...base, windowMs: 15 * 60 * 1000, max: 8, skipSuccessfulRequests: true, message: { success: false, message: 'Too many failed login attempts. Please try again in 15 minutes.' } });
module.exports = { apiLimiter, messageLimiter, authLimiter };
