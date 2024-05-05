import express from "express";
import {
  getAllForumPosts,
  addOneForumPost,
  getOnePost,
  deleteOnePost,
  addComment,
  deleteComment,
  likePost,
  dislikePost,
  removeReaction,
} from "./forumPostsController.js";

const router = express.Router();

router.get("/", getAllForumPosts);

router.post("/post/add", addOneForumPost);

router.get("/post/:id", getOnePost);

router.delete("/post/:id", deleteOnePost);

router.post("/comment/post/:id", addComment);

router.delete("/comment/post/:postId/:commentId", deleteComment);

router.post("/post/:postId/like", likePost);

router.post("/post/:postId/dislike", dislikePost);

router.post("/post/:postId/neutral", removeReaction);

export default router;
