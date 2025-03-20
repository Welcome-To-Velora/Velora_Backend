import express from "express";

import { protectRoute, adminRoute } from "../middlewares/AuthUser.js";
import { createPayment, 
        updatePaymentStatus 
} from "../controllers/paymentController.js.js";

const router = express.Router();

router.post("/", protectRoute, createPayment);
router.patch("/:id", protectRoute, updatePaymentStatus);

export default router;