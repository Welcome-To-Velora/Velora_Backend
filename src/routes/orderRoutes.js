import express from "express";

import { protectRoute, adminRoute } from "../middlewares/AuthUser.js";
import { createOrder, 
        getOrders,
 } from "../controllers/orderControllers.js";


const router = express.Router();

router.post("/", protectRoute, createOrder);
router.get("/", protectRoute, adminRoute, getOrders);
router.get("/:id", protectRoute, getOrderById);
router.patch("/:id", protectRoute, adminRoute, updateOrderStatus);
router.delete("/:id", protectRoute, adminRoute, deleteOrder);

export default router;