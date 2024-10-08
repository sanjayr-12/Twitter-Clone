import express from "express";
import { protectRoute } from "../middleware/protectRoutes.js";
import multer from "multer";
import {
  createPost,
  deletePost,
  commentPost,
  likePost,
  getAllPosts,
  getLikePosts,
  getFollowingPost,
  getUserPosts,
} from "../controllers/post.controllers.js";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    fieldSize: 10 * 1024 * 1024,
  },
});
router.get("/likes/:id", protectRoute, getLikePosts);
router.get("/all", protectRoute, getAllPosts);
router.get("/following", protectRoute, getFollowingPost);
router.get("/user/:username", protectRoute, getUserPosts);
router.post("/create", protectRoute, upload.single("img"), createPost);
router.post("/like/:id", protectRoute, likePost);
router.post("/comment/:id", protectRoute, commentPost);
router.delete("/:id", protectRoute, deletePost);

export default router;
