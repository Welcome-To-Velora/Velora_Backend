import express from "express";

import { protectRoute } from "../middlewares/AuthUser";
import { getCart,
        addToCart,
} from "../controllers/cartControllers.js";


const router = express.Router();

router.get("/", protectRoute, getCart);
router.post("/add", protectRoute, addToCart);



export default router;