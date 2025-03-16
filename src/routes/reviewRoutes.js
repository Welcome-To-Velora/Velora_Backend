import express from "express";

import { protectRoute } from "../middlewares/AuthUser.js";
import { addReview, 
        getProductReviews,
        deleteReview,
 } from "../controllers/reviewControllers.js";

const router = express.Router();

router.post("/:productID", protectRoute, addReview);
router.get("/:productID", getProductReviews);
router.delete("/:productID", protectRoute, deleteReview);


export default router;