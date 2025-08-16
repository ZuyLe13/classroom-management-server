import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../configs/firebase.js";
import { sendSMS } from "./twilioService.js";
import { sendAccessCodeToEmail } from "../configs/nodemailer.js";

export const storeAccessCode = async (reqBody) => {
  try {
    const accessCode = Math.floor(100000 + Math.random() * 900000).toString();
    let messageInfo;
    if (reqBody.phone) {
      await setDoc(doc(db, "accessCodes", reqBody.phone), { accessCode });
      messageInfo = await sendSMS(reqBody.phone, `Your access code is: ${accessCode}`);
    } else {
      await setDoc(doc(db, "accessCodes", reqBody.email), { accessCode });
      messageInfo = await sendAccessCodeToEmail(reqBody.email, accessCode);
    }
    
    return messageInfo;
  } catch (error) {
    console.error("Error storing access code:", error);
    throw new Error("Failed to store access code");
  }
}

export const getAccessCode = async (reqBody) => {
  try {
    const storedAccessCode = await getDoc(doc(db, "accessCodes", reqBody.phone || reqBody.email));
    if (storedAccessCode.exists() && storedAccessCode.data().accessCode === reqBody.accessCode) {
      return storedAccessCode.data().accessCode;
    } else {
      throw new Error("Access code not found");
    }
  } catch (error) {
    console.error("Error retrieving access code:", error);
    throw new Error("Failed to retrieve access code");
  }
}

export const clearAccessCode = async (phone) => {
  try {
    await updateDoc(doc(db, "accessCodes", phone), { accessCode: "" });
  } catch (error) {
    console.error("Error clearing access code:", error);
    throw new Error("Failed to clear access code");
  }
}