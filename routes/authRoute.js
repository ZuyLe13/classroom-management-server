import { Router } from "express";
import { createAccessCode, validateAccessCode } from "../controllers/authController.js";
import { validateBody } from "../middlewares/validateBody.js";
import { accessCodeValidation, phoneValidation } from "../validations/authValidation.js";

const router = Router();

router.post("/createAccessCode", validateBody(phoneValidation), createAccessCode);
router.post("/validateAccessCode", validateBody(accessCodeValidation), validateAccessCode);

export default router;