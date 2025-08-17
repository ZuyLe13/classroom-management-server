import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { studentValidation } from "../validations/studentValidation.js";
import { addStudent, deleteStudent, getAllStudents, setupAccount, signInStudent, updateStudent, verifySetupToken } from "../controllers/instructorController.js";

const router = Router();
  
router.post("/addStudent", validateBody(studentValidation), addStudent);
router.get("/verifySetupToken", verifySetupToken);
router.post("/setupAccount", setupAccount);
router.post("/signIn", signInStudent);
router.get("/students", getAllStudents);
router.put("/editStudent/:phone", updateStudent);
router.delete("/student/:phone", deleteStudent);

export default router;