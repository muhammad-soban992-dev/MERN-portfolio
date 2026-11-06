const nodemailer = require('nodemailer');
const { env } = require('../config/env');
const logger = require('../utils/logger');

const configured = Boolean(env.smtp.host && env.smtp.user && env.smtp.pass);
let transporter = null;
if (configured) {
  transporter = nodemailer.createTransport({
    host: env.smtp.host, port: env.smtp.port,
    secure: env.smtp.port === 465,
    auth: { user: env.smtp.user, pass: env.smtp.pass },
  });
}
const oneLine = (v) => String(v || '').replace(/[\r\n]+/g, ' ').trim(); // prevent email header injection
async function sendContactNotification(message) {
  if (!configured) { logger.warn('SMTP not configured — contact email skipped (message was still saved).'); return { sent: false, reason: 'SMTP not configured' }; }
  if (!env.smtp.to) { logger.warn('MAIL_TO not set — contact email skipped.'); return { sent: false, reason: 'MAIL_TO not set' }; }
  await transporter.sendMail({
    from: env.smtp.from, to: env.smtp.to, replyTo: oneLine(message.email),
    subject: `Portfolio contact: ${oneLine(message.subject)}`,
    text: `Name: ${oneLine(message.name)}\nEmail: ${oneLine(message.email)}\nSubject: ${oneLine(message.subject)}\n\n${message.body}`,
  });
  return { sent: true };
}
module.exports = { sendContactNotification, mailConfigured: configured };
