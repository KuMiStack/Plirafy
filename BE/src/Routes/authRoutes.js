import express from "express";
import { login, signUp } from "../Controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);

export default router;