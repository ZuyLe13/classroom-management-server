import config from '../configs/config.js';
import { sendSMS } from '../services/twiloService.js';
import { clearAccessCode, getAccessCode, storeAccessCode } from '../services/firebaseService.js';

export const createAccessCode = async (req, res) => {
  try {
    const { phone } = req.body;
    const accessCode = Math.floor(100000 + Math.random() * 900000).toString();
    await storeAccessCode(phone, accessCode);
    const messageInfo = await sendSMS(config.to, `Your access code is: ${accessCode}`);
    res.status(200).json({ message: "Access code sent successfully", messageInfo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const validateAccessCode = async (req, res) => {
  try {
    const { phone, accessCode } = req.body;
    const storedAccessCode = await getAccessCode(phone);
    if (storedAccessCode !== accessCode) {
      res.status(401).json({ error: "Invalid access code" });
    }
    await clearAccessCode(phone);
    res.status(200).json({ message: "Access code validated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}