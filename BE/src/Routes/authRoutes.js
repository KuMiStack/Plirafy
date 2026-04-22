import express from "express";
import { login } from "../Controllers/authController.js";
import { signup } from "../Controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup",signup);

export default router;