import express from "express";

import { protectRoute } from "../middlewares/AuthUser.js";
import { getCart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
} from "../controllers/cartControllers.js";


const router = express.Router();

router.get("/", protectRoute, getCart);
router.post("/add", protectRoute, addToCart);
router.patch("/update/:productID", protectRoute, updateCartItem);
router.delete("/remove/:productID", protectRoute, removeFromCart);
router.delete("/clear", protectRoute, clearCart)



export default router;