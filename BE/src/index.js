import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import testRoutes from "./Routes/testRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is alive. Barely, but alive.");
});

app.use("/api", testRoutes);

const PORT = process.env.BACKEND_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});