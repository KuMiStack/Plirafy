import express from "express";
import { login } from "../Controllers/authController.js";
import { signUp } from "../Controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/signUp",signUp);

export default router;