import express from "express";
import { getActivities } from "../Controllers/activitiesController.js";
import { postActivities } from "../Controllers/activitiesController.js";
import { deleteActivities } from "../Controllers/activitiesController.js";

const router = express.Router();

router.get("/getActivities", getActivities);
router.post("/postActivities", postActivities);
router.delete("/deleteActivities", deleteActivities);

export default router;