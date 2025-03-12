import express from "express";

import { protectRoute, adminRoute } from "../middlewares/AuthUser.js";
import { getAllProducts, getFeaturedProducts, createProduct, deleteProduct, getProductById } from "../controllers/productController.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/:id", getProductById);
router.post("/", protectRoute, adminRoute, createProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
router.patch("/:id", protectRoute, adminRoute, updateProduct);



export default router;