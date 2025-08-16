import { createAccount, createNew, signIn, verifyToken } from "../services/instructorService.js";

export const addStudent = async (req, res) => {
  try {
    await createNew(req.body);
    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const verifySetupToken = async (req, res) => {
  try {
    const student = await verifyToken(req.query);
    res.status(200).json({ student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const setupAccount = async (req, res) => {
  try {
    const newAccount = await createAccount(req.body);
    res.status(201).json({ message: "Account created successfully", account: newAccount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const signInStudent = async (req, res) => {
  try {
    const students = await signIn(req.body);
    res.status(200).json({ message: "Sign in successful", students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}