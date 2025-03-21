import express from "express";

import { protectRoute } from "../middlewares/AuthUser.js";
import { addReview, 
        getProductReviews,
        deleteReview,
        updateReview,
 } from "../controllers/reviewControllers.js";

const router = express.Router();

router.post("/:productID", protectRoute, addReview);
router.get("/:productID", getProductReviews);
router.delete("/:reviewID", protectRoute, deleteReview);
router.put("/:id", protectRoute, updateReview);


export default router;