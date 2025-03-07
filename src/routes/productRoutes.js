import express from "express";

import { protectRoute, adminRoute } from "../middlewares/AuthUser.js";
import { getAllProducts, getFeaturedProducts, createProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.post("/", protectRoute, adminRoute, createProduct);



export default router;