import express from 'express'
import isAuthenticatde from '../middlewares/isAuthenticated.js';
import upload from '../middlewares/multer.js';
import { addComment, addNewPost, bookmarkPost, deletePost, dislikePost, getAllPost, getCommentsOfPost, getUserPost, likePost } from '../Controllers/post.controller.js';

const router = express.Router();

router.route('/addpost').post(isAuthenticatde, upload.single('image'), addNewPost)

router.route('/all').get(isAuthenticatde, getAllPost)
router.route('/userpost/all').get(isAuthenticatde, getUserPost)
router.route('/:id/like').get(isAuthenticatde, likePost)
router.route('/:id/dislike').get(isAuthenticatde, dislikePost)
router.route('/:id/comment').post(isAuthenticatde, addComment)
router.route('/:id/comment/all').get(isAuthenticatde, getCommentsOfPost)

router.route('/delete/:id').get(isAuthenticatde, deletePost)
router.route('/:id/bookmark').get(isAuthenticatde, bookmarkPost)

export default router;
