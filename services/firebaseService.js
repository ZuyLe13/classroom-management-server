import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../configs/firebase.js";

export const storeAccessCode = async (phone, accessCode) => {
  try {
    await setDoc(doc(db, "accessCodes", phone), { accessCode });
  } catch (error) {
    console.error("Error storing access code:", error);
    throw new Error("Failed to store access code");
  }
}

export const getAccessCode = async (phone) => {
  try {
    const accessCode = await getDoc(doc(db, "accessCodes", phone));
    if (accessCode.exists()) {
      return accessCode.data().accessCode;
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
    console.log('Access code cleared successfully');
  } catch (error) {
    console.error("Error clearing access code:", error);
    throw new Error("Failed to clear access code");
  }
}