import express from 'express'
import isAuthenticatde from '../middlewares/isAuthenticated.js';
import { getMessage, sendMessage } from '../Controllers/message.controller.js';
const router = express.Router();

router.route('/send/:id').post(isAuthenticatde,sendMessage)
router.route('/all/:id').get(isAuthenticatde,getMessage)

export default router