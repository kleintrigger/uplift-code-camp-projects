import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./backend/config/db.js";

connectDB();

app.listen(4558, () => console.log("Server running on http://localhost:4558"));
