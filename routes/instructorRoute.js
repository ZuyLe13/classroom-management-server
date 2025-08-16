import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { studentValidation } from "../validations/studentValidation.js";
import { addStudent } from "../controllers/instructorController.js";

const router = Router();
  
router.post("/addStudent", validateBody(studentValidation), addStudent);

export default router;