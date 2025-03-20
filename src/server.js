import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);



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
