import express from "express";

import { protectRoute, adminRoute } from "../middlewares/AuthUser.js";
import { getAllProducts } from "../controllers/productController.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);



export default router;