import express from "express";

import { protectRoute } from "../middlewares/AuthUser.js";
import { createCheckoutSession } from "../controllers/stripeControllers.js";

const router = express.Router();

router.post("/create-checkout-session", protectRoute, createCheckoutSession);

export default router;