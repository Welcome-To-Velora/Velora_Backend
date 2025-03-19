import express from "express";

import { protectRoute, adminRoute } from "../middlewares/AuthUser.js";
import { createOrder, 
        getOrders,
 } from "../controllers/orderControllers.js";


const router = express.Router();

router.post("/", protectRoute, createOrder);
router.get("/", protectRoute, adminRoute, getOrders);

export default router;