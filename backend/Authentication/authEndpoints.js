import express from "express";
import {
    registerUser,
    loginUser,
    sendPasswordResetEmail,
    verifyAndResetPassword,
    createAdmin,
    verifyUser,
    updateUserProfile,
    profile
} from "./authController.js";
import { protect } from './authMiddleware.js';

const router = express.Router();

router.post('/authentication/register', registerUser);
router.post('/authentication/verify', verifyUser);
router.post('/authentication/create-admin', createAdmin);
router.post('/authentication/login', loginUser);
router.put('/authentication/profile', protect, updateUserProfile);
router.get('/authentication/profile', protect, profile);

router.post('/authentication/send-reset-email', sendPasswordResetEmail);
router.post('/authentication/verify-reset-password', verifyAndResetPassword);

export default router;
