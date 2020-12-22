import express from "express";
import {
    authUser,
    getUserProfile,
    updateUserProfile,
    registerUser,
    getUsers,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authmiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

export default router;
