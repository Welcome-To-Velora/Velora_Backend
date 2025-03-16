import express from "express";

import { protectRoute } from "../middlewares/AuthUser.js";
import { addToWishlist, 
        clearWishlist, 
        getWishlist,
        removeFromWishlist,
 } from "../controllers/wishlistControllers.js";

const router = express.Router();

router.post("/:productID", protectRoute, addToWishlist);
router.get("/", protectRoute, getWishlist);
router.delete("/:productID", protectRoute, removeFromWishlist);
router.delete("/", protectRoute, clearWishlist);

export default router;