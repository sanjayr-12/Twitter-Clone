import express from "express";
const router = express.Router();
import { protectRoute } from "../middleware/protectRoutes.js";
import { getUserProfile, followUnfollowUs,getSuggestedUser, updateUserProfile } from "../controllers/user.controller.js";

router.get("/profile/:username", protectRoute, getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUser);
router.post("/follow/:id", protectRoute, followUnfollowUs);
router.post("/update", protectRoute, updateUserProfile);

export default router;
