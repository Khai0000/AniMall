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
    logout,
    deleteUser,
    resendVerificationCode,
    resendPasswordResetCode,
} from "./authController.js";
import { protect } from './authMiddleware.js';

const router = express.Router();

router.post('/authentication/register', registerUser);
router.post('/authentication/verify', verifyUser);
router.post('/authentication/resendcode', resendVerificationCode);
router.post('/authentication/create-admin', createAdmin);
router.post('/authentication/login', loginUser);
router.put('/authentication/updateprofile', protect, updateUserProfile);
router.get('/authentication/getuser', getUser);
router.get('/authentication/logout', logout);
router.get('/authentication/profile', protect, profile);
router.delete('/authentication/delete', protect, deleteUser);
router.get('/authentication/oauthcallback', async (req, res) => {
    //const code = '4/0AdLIrYfBUzlvEudRpfcvmKUjMoEf3MfC9AObu9X8fjtH7orhy0MNKJRWah_mjfES_48F1w'
    const code = req.query.code
    //res.send(code)
    const oAuth2Client = new OAuth2(process.env.GMAIL_CLIENT_ID, process.env.GMAIL_CLIENT_SECRET, "http://localhost:4000/api/auth/authentication/oauthcallback");
    //const oAuth2Client = new OAuth2(process.env.GMAIL_CLIENT_ID, process.env.GMAIL_CLIENT_SECRET);
    const { tokens } = await oAuth2Client.getToken(code)
    res.send(tokens)
});

router.get('/authentication/getauthcode', async (req, res) => {
    const oAuth2Client = new OAuth2(process.env.GMAIL_CLIENT_ID, process.env.GMAIL_CLIENT_SECRET);
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://mail.google.com/'],
        redirect_uri: "http://localhost:4000/api/auth/authentication/oauthcallback"
        // scope: ['https://www.googleapis.com/auth/gmail.send'],
    });
    res.send(authUrl)
});

router.get('/authentication/oauthcallback', (req, res) => {
    res.send(req.query)
});

router.post('/authentication/send-reset-email', sendPasswordResetEmail);
router.post('/authentication/verify-reset-password', verifyAndResetPassword);
router.post('/authentication/resend-reset-code', resendPasswordResetCode);


export default router;
