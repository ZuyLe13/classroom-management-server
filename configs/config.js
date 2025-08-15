import dotenv from 'dotenv';

dotenv.config();

const {
  PORT,
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
  ACCOUNT_SID,
  AUTH_TOKEN,
  FROM,
  TO
} = process.env;

export default {
  port: PORT,
  firebaseConfig: {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID
  },
  accountSid: ACCOUNT_SID,
  authToken: AUTH_TOKEN,
  from: FROM,
  to: TO
};