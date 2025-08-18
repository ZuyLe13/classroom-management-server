import config from '../configs/config.js';
import { clearAccessCode, getAccessCode, storeAccessCode } from '../services/firebaseService.js';
import jwt from 'jsonwebtoken';

export const createAccessCode = async (req, res) => {
  try {
    const messageInfo = await storeAccessCode(req.body);
    res.status(200).json({ message: "Access code sent successfully", messageInfo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const validateAccessCode = async (req, res) => {
  try {
    const { phone, email } = req.body;
    await getAccessCode(req.body);
    await clearAccessCode(phone || email);
    res.status(200).json({ message: "Access code validated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const loginEmail = async (req, res) => {
  try {
    const messageInfo = await storeAccessCode(req.body);
    res.status(200).json({ message: "Access code sent successfully", messageInfo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};