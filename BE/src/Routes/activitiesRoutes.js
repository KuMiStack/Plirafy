import express from "express";
import { getActivities } from "../Controllers/activitiesController.js";
import { postActivities } from "../Controllers/activitiesController.js";
import { deleteActivities } from "../Controllers/activitiesController.js";
import { AssignActivityToUser } from "../Controllers/activitiesController.js";
import { getUserActivities } from "../Controllers/activitiesController.js";
import { deleteUserActivities } from "../Controllers/activitiesController.js";


const router = express.Router();

router.get("/getActivities", getActivities);
router.post("/postActivities", postActivities);
router.delete("/deleteActivities", deleteActivities);

router.get("/getUserActivities", getUserActivities);
router.post("/assignActivityToUser", AssignActivityToUser);
router.delete("/deleteUserActivity", deleteUserActivities);

export default router;