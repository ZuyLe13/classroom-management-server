import { createAccount, createNew, deleteStudentByPhone, getAllDetails, signIn, updateDetails, verifyToken } from "../services/instructorService.js";

export const addStudent = async (req, res) => {
  try {
    const newStudent = await createNew(req.body);
    res.status(201).json({ message: "Student added successfully", student: newStudent });
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

export const getAllStudents = async (req, res) => {
  try {
    const students = await getAllDetails();
    res.status(200).json({ message: "Students fetched successfully", students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await updateDetails(req.params.phone, req.body);
    res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteStudent = async (req, res) => {
  try {
    await deleteStudentByPhone(req.params.phone);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}