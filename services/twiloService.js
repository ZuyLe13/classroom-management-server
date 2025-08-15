import twilio from 'twilio';
import config from '../configs/config.js';

const client = new twilio(config.accountSid, config.authToken);

export const sendSMS = async (phone, message) => {
  return client.messages.create({
    from: config.from || '+15005550006',
    to: phone,
    body: message,
  });
}