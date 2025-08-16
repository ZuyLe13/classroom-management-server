import nodemailer from 'nodemailer';
import config from './config.js';

const transporter = nodemailer.createTransport({
  host: config.smtpConfig.host,
  port: config.smtpConfig.port,
  secure: false,
  auth: {
    user: config.smtpConfig.user,
    pass: config.smtpConfig.pass
  }
});

export const sendAccessCodeToEmail = async (to, accessCode) => {
  return await transporter.sendMail({
    from: 'no-reply@example.com',
    to,
    subject: 'Your Access Code',
    html: `<p>Your access code is: <strong>${accessCode}</strong></p>`
  });
}
