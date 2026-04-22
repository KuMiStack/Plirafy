import express from "express";
import { getTestStartup, postTestHello } from "../Controllers/testControler.js";

const router = express.Router();

router.get("/hello",getTestStartup);
router.post("/test",postTestHello);

export default router;