import { Router } from "express";
import { deleteLesson, getMyLessons, updateStudentLesson } from "../controllers/studentController.js";

const router = Router();

router.get("/myLessons/:phone", getMyLessons);
router.put("/myLessons/:phone/:lessonId", updateStudentLesson);
router.delete("/myLessons/:lessonId", deleteLesson);

export default router;