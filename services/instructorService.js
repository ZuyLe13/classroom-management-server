import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../configs/firebase.js";
import { sendLinkToEmail } from "../configs/nodemailer.js";
import config from "../configs/config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createNew = async (reqBody) => {
  try {
    const value = {...reqBody};
    const storedUser = await getDoc(doc(db, "users", reqBody.phone));
    if (storedUser.exists()) {
      throw new Error("User with this phone number already exists");
    }
    const newUser = await setDoc(doc(db, "users", reqBody.phone), value);
    const token = jwt.sign({ phone: reqBody.phone }, config.jwtSecret, { expiresIn: '1h' });
    const link = `${config.frontendUrl}/sign-in?token=${token}`;

    await sendLinkToEmail(reqBody.email, link);
    return newUser;
  } catch (error) {
    throw new Error("Failed to create new user");
  }
}

export const getDetailsByPhone = async (phone) => {
  try {
    const storedUser = await getDoc(doc(db, "users", phone));
    if (storedUser.exists()) {
      return storedUser.data();
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error("Failed to retrieve user by phone");
  }
}

export const getAllDetails = async () => {
  try {
    const usersCollection = await getDocs(collection(db, "users"));
    const users = usersCollection.docs.map(doc => doc.data());
    return users;
  } catch (error) {
    throw new Error("Failed to retrieve all users");
  }
}

export const updateDetails = async (phone, reqBody) => {
  try {
    const updatedUser = await setDoc(doc(db, "users", phone), reqBody);
    return updatedUser;
  } catch (error) {
    throw new Error("Failed to update user details");
  }
}

export const deleteUserByPhone = async (phone) => {
  try {
    await deleteDoc(doc(db, "users", phone));
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};

export const verifyToken = async (reqQuery) => {
  try {
    const decoded = jwt.verify(reqQuery.token, config.jwtSecret);
    const user = await getDetailsByPhone(decoded.phone);
    return user;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Token has expired"); 
    }
    throw new Error("Failed to verify setup token"); 
  }
}

export const createAccount = async (reqBody) => {
  try {
    const decoded = jwt.verify(reqBody.token, config.jwtSecret);
    const hashPassword = await bcrypt.hash(reqBody.password, 10);

    const token = jwt.sign({ phone: reqBody.phone }, config.jwtSecret, { expiresIn: '1h' });
    
    const newAccount = await setDoc(doc(db, "users", decoded.phone),
    {
      ...reqBody,
      token,
      password: hashPassword,
      isVerified: true
    }, { merge: true });
    return { token };
  } catch (error) {
    throw new Error("Failed to create account");
  }
}

export const signIn = async (reqBody) => {
  try {
    const usersCollection = collection(db, 'users');
    const querySnapshot = await getDocs(
      query(usersCollection, where('username', '==', reqBody.username))
    );

    if (querySnapshot.empty) {
      throw new Error('User not found');
    }

    const storedUser = querySnapshot.docs[0];
    const userData = storedUser.data();

    const isValidPassword = await bcrypt.compare(reqBody.password, userData.password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ phone: userData.phone }, config.jwtSecret, { expiresIn: '1h' });

    return { userData, token };
  } catch (error) {
    throw new Error("Failed to sign in");
  }
}
