import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";

import { connectDB } from "./lib/db.js"

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);




// Test Routes
app.get("/api/health", (request, response) => {
    response.status(200).json({ message: "Server is running" });
  });


export default app;

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 1234;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      
      connectDB();
    });
  }
