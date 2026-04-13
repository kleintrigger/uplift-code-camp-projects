import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./backend/routes/userRoutes.js";
import applicationRoutes from "./backend/routes/jobApplicationRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";


dotenv.config();
const app = express();

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// API routes
app.use("/api/auth", userRoutes);
app.use("/api/applications", applicationRoutes);

// Serve frontend folder
const frontendPath = path.join(__dirname, "frontend");
app.use(express.static(frontendPath));

// Explicit frontend routes
app.get("/", (req, res) => res.sendFile(path.join(frontendPath, "index.html")));
app.get("/login.html", (req, res) =>
  res.sendFile(path.join(frontendPath, "login.html")),
);
app.get("/register.html", (req, res) =>
  res.sendFile(path.join(frontendPath, "register.html")),
);
app.get("/dashboard.html", (req, res) =>
  res.sendFile(path.join(frontendPath, "dashboard.html")),
);

export default app;
