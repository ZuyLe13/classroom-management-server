import { Router } from "express";
import { createAccessCode, loginEmail, validateAccessCode } from "../controllers/authController.js";
import { validateBody } from "../middlewares/validateBody.js";
import { accessCodeValidation, emailValidation, phoneValidation } from "../validations/authValidation.js";

const router = Router();

router.post("/createAccessCode", validateBody(phoneValidation), createAccessCode);
router.post("/validateAccessCode", validateBody(accessCodeValidation), validateAccessCode);
router.post("/loginEmail", validateBody(emailValidation), loginEmail);

export default router;