import express from 'express'
import { editProfile, followOrUnfollow, getProfile, getSuggestedUsers, login, logout, register } from '../Controllers/user.controller.js';
import isAuthenticatde from '../middlewares/isAuthenticated.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/:id/profile').get(isAuthenticatde, getProfile)
router.route('/profile/edit').post(isAuthenticatde, upload.single('profilePicture'),editProfile);

router.route('/suggested').get(isAuthenticatde, getSuggestedUsers)
router.route('/followorunfollow/:id').post(isAuthenticatde, followOrUnfollow)



export default router;