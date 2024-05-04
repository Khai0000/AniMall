import express from 'express';
import { getAllForumPosts,addOneForumPost,getOnePost,deleteOnePost,addComment,deleteComment } from './forumPostsController.js';

const router = express.Router();

router.get('/',getAllForumPosts);

router.post('/post/add',addOneForumPost);

router.get('/post/:id',getOnePost);

router.delete('/post/:id',deleteOnePost);

router.post('/comment/post/:id',addComment);

router.delete('/comment/post/:postId/:commentId',deleteComment);

export default router;