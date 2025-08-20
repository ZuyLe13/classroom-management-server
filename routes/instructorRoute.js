import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { studentValidation } from "../validations/studentValidation.js";
import { addStudent, assignLesson, createLesson, deleteStudent, getAllLessons, getAllStudents, setupAccount, signInStudent, updateLesson, updateStudent, verifySetupToken } from "../controllers/instructorController.js";
import { lessonValidation } from "../validations/lessonValidation.js";

const router = Router();
  
router.get("/verifySetupToken", verifySetupToken);
router.get("/students", getAllStudents);
router.get("/lessons", getAllLessons);

router.post("/addStudent", validateBody(studentValidation), addStudent);
router.post("/setupAccount", setupAccount);
router.post("/signIn", signInStudent);
router.post("/createLesson", validateBody(lessonValidation), createLesson);
router.post("/assignLesson", assignLesson);

router.put("/editLesson/:id", updateLesson);
router.put("/editStudent/:phone", updateStudent);
router.delete("/student/:phone", deleteStudent);

export default router;