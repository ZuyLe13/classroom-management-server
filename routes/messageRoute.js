import { Router } from "express";
import { getHistoryMessages } from "../controllers/messageController.js";

const router = Router();

router.get("/history", getHistoryMessages);

export default router;