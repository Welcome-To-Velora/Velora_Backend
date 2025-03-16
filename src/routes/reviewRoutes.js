import express from "express";

import { protectRoute, adminRoute } from "../middlewares/AuthUser.js";
import { addReview,

 } from "../controllers/reviewControllers.js";

const router = express.Router();

router.post("/:productID", protectRoute, addReview);


export default router;