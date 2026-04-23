import express from "express";
import {
  getFinancialActivities,
  createFinancialActivity,
  editFinancialActivity,
  addToCurrentAmount,
  deleteFinancialActivity,
} from "../Controllers/financialController.js";

const router = express.Router();

router.get("/getFinancialActivities", getFinancialActivities);
router.post("/createFinancialActivity", createFinancialActivity);
router.put("/editFinancialActivity", editFinancialActivity);
router.patch("/addToCurrentAmount", addToCurrentAmount);
router.delete("/deleteFinancialActivity", deleteFinancialActivity);

export default router;