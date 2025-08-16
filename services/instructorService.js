import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../configs/firebase.js";
import { sendLinkToEmail } from "../configs/nodemailer.js";
import config from "../configs/config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createNew = async (reqBody) => {
  try {
    const value = {...reqBody};
    const storedStudent = await getDoc(doc(db, "students", reqBody.phone));
    if (storedStudent.exists()) {
      throw new Error("Student with this phone number already exists");
    }
    const newStudent = await setDoc(doc(db, "students", reqBody.phone), value);
    const token = jwt.sign({ phone: reqBody.phone }, config.jwtSecret, { expiresIn: '1h' });
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

export const updateDetails = async (phone, reqBody) => {
  try {
    await setDoc(doc(db, "students", phone), reqBody);
  } catch (error) {
    throw new Error("Failed to update student details");
  }
}

export const verifyToken = async (reqQuery) => {
  try {
    const decoded = jwt.verify(reqQuery.token, config.jwtSecret);
    const student = await getDetailsByPhone(decoded.phone);
    return student;
  } catch (error) {
    throw new Error("Failed to verify setup token"); 
  }
}

export const createAccount = async (reqBody) => {
  try {
    const decoded = jwt.verify(reqBody.token, config.jwtSecret);
    const hashPassword = await bcrypt.hash(reqBody.password, 10);

    const newAccount = await setDoc(doc(db, "students", decoded.phone),
    {
      ...reqBody,
      password: hashPassword,
      isVerified: true
    }, { merge: true });
    return newAccount;
  } catch (error) {
    throw new Error("Failed to create account");
  }
}

export const signIn = async (reqBody) => {
  try {
    const studentsRef = collection(db, 'students');
    const q = query(studentsRef, where('username', '==', reqBody.username));
    const querySnapshot = await getDocs(q);

    const storedStudent = querySnapshot.docs[0];
    const studentData = storedStudent.data();

    if (querySnapshot.empty) {
      throw new Error('Student not found');
    }
    const isValidPassword = await bcrypt.compare(reqBody.password, studentData.password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }
    const token = jwt.sign({ phone: reqBody.phone }, config.jwtSecret, { expiresIn: '1h' });
    return { token }; 
  } catch (error) {
    throw new Error("Failed to sign in");
  }
}
