import express from "express";
import { deleteUser, getAllUsers, 
        getUserById, 
        login, 
        logout, 
        signup, 
        updateUser
} from "../controllers/authControllers.js";
import { protectRoute, adminRoute } from "../middlewares/AuthUser.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", protectRoute, adminRoute, getAllUsers);
router.get("/:id", protectRoute, adminRoute, getUserById);
router.put("/:id", protectRoute, updateUser);
router.delete("/:id", protectRoute, adminRoute, deleteUser);


export default router;