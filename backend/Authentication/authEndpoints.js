import express from "express";
import {
    registerUser,
    loginUser,
    sendPasswordResetEmail,
    verifyAndResetPassword,
    createAdmin,
    verifyUser,
    updateUserProfile,
    profile,
    oauthcallback,
    getUser,
    logout
} from "./authController.js";
import { protect } from './authMiddleware.js';

const router = express.Router();

router.post('/authentication/register', registerUser);
router.post('/authentication/verify', verifyUser);
router.post('/authentication/create-admin', createAdmin);
router.post('/authentication/login', loginUser);
router.put('/authentication/profile', protect, updateUserProfile);
router.get('/authentication/getuser', getUser);
router.get('/authentication/logout', logout);
router.get('/authentication/profile', protect, profile);
router.get('/authentication/oauthcallback', (req, res) => {
    res.send('hello world')
});

router.get('/test', async (req, res) => {


    // const oAuth2Client = new OAuth2(process.env.GMAIL_CLIENT_ID, process.env.GMAIL_CLIENT_SECRET, 'http://localhost:4000/api/auth/authentication/oauthcallback');

    // const { tokens } = await oAuth2Client.getToken("4/0AdLIrYcvSLOAQ8J2c6y6OenA82qH1_Pz5GSO_aV5Q7ieXQdaHQpUE9zouW164Wlpj53b1g")


});

router.get('/authentication/oauthcallback', (req, res) => {
    res.send(req.query)
});

router.post('/authentication/send-reset-email', sendPasswordResetEmail);
router.post('/authentication/verify-reset-password', verifyAndResetPassword);

export default router;
