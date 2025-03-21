import express from "express";

import { protectRoute, adminRoute } from "../middlewares/AuthUser.js";
import { createPayment, 
        deletePayment, 
        getAllPayments, 
        getPaymentById, 
        updatePaymentStatus 
} from "../controllers/paymentController.js.js";

const router = express.Router();

router.post("/", protectRoute, createPayment);
router.patch("/:id", protectRoute, updatePaymentStatus);
router.get("/", protectRoute, adminRoute, getAllPayments);
router.get("/:id", protectRoute, getPaymentById);
router.delete("/:id", protectRoute, adminRoute, deletePayment);

export default router;