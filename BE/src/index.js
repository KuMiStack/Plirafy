import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import testRoutes from "./Routes/testRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import activitiesRoutes from "./Routes/activitiesRoutes.js";

import { supabase } from "./supabase.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is alive. Surprise Mothafucka!");
});

app.use("/api", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/activities", activitiesRoutes);

const PORT = process.env.BACKEND_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});