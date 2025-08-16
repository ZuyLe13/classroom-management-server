import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../configs/firebase.js";
import { sendLinkToEmail } from "../configs/nodemailer.js";
import config from "../configs/config.js";
import jwt from "jsonwebtoken";

export const createNew = async (reqBody) => {
  try {
    const value = {...reqBody};
    const storedStudent = await getDoc(doc(db, "students", reqBody.phone));
    if (storedStudent.exists()) {
      throw new Error("Student with this phone number already exists");
    }
    const newStudent = await setDoc(doc(db, "students", reqBody.phone), value);
    const token = jwt.sign({ email: reqBody.email }, config.jwtSecret, { expiresIn: '1h' });
    const link = `${config.frontendUrl}/setup-account?token=${token}`;

    await sendLinkToEmail(reqBody.email, link);
    return newStudent;
  } catch (error) {
    throw new Error("Failed to create new student");
  }
}

export const getDetailsByPhone = async (phone) => {
  try {
    const storedStudent = await getDoc(doc(db, "students", phone));
    if (storedStudent.exists()) {
      return storedStudent.data();
    } else {
      throw new Error("Student not found");
    }
  } catch (error) {
    throw new Error("Failed to retrieve student by phone");
  }
}

export const getAllDetails = async () => {
  try {
    const studentsCollection = await getDocs(collection(db, "students"));
    const students = studentsCollection.docs.map(doc => doc.data());
    return students;
  } catch (error) {
    throw new Error("Failed to retrieve all students");
  }
}