import express from "express";

import { protectRoute, adminRoute } from "../middlewares/AuthUser.js";
import { getAllProducts, 
        getFeaturedProducts, 
        createProduct, 
        deleteProduct, 
        getProductById, 
        updateProduct, 
        searchProducts, 
        getProductsByCategory } from "../controllers/productController.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/search", searchProducts);
router.get("/:id", getProductById);
router.post("/", protectRoute, adminRoute, createProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
router.patch("/:id", protectRoute, adminRoute, updateProduct);
router.get("/category/:categoryID", getProductsByCategory);



export default router;