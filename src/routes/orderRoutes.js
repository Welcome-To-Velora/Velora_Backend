import express from "express";

import { protectRoute, adminRoute } from "../middlewares/AuthUser.js";
import { createOrderFromCart, 
        getOrders,
        getOrderById,
        updateOrderStatus,
        deleteOrder,
 } from "../controllers/orderControllers.js";


const router = express.Router();

router.post("/", protectRoute, createOrderFromCart);
router.get("/", protectRoute, adminRoute, getOrders);
router.get("/:id", protectRoute, getOrderById);
router.patch("/:id/status", protectRoute, adminRoute, updateOrderStatus);
router.delete("/:id", protectRoute, adminRoute, deleteOrder);

export default router;