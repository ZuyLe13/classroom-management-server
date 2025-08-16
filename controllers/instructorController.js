import { createNew } from "../services/instructorService.js";

export const addStudent = async (req, res) => {
  try {
    await createNew(req.body);
    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 