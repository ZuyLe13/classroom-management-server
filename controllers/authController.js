import { doc, setDoc } from 'firebase/firestore';
import { clearAccessCode, getAccessCode, storeAccessCode } from '../services/firebaseService.js';
import jwt from 'jsonwebtoken';
import { db } from '../configs/firebase.js';
import config from '../configs/config.js';
import bcrypt from 'bcrypt';

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

    if (phone) {
      const token = jwt.sign({ phone: phone }, config.jwtSecret, { expiresIn: '1h' });
      const hashPassword = await bcrypt.hash('12345678', 10);
      await setDoc(doc(db, "users", phone),
      {
        phone,
        username: phone,
        email: '',
        token,
        password: hashPassword,
        role: 'instructor',
        isVerified: true,
        address: ''
      }, { merge: true });
      return res.status(200).json({
        message: "Access code validated successfully",
        token,
      });
    }
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