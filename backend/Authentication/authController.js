import mongoose from "mongoose";
import { AuthModel } from "../Authentication/authModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { google } from 'googleapis';
const OAuth2 = google.auth.OAuth2;
import OAuth2Client from 'google-auth-library';
import axios, { isCancel, AxiosError } from 'axios';
import { generateVerificationCode, sendVerificationEmail } from "./emailUtils.js";



const temporaryAccounts = {}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);//, { expiresIn: '30d' });
};

export const oauthcallback = async (req, res) => {
    console.log(req)
};

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExists = await AuthModel.findOne({ email });
        if (userExists) {
            // if (!userExists.verifyStatus) {
            //     // Resend verification code if the user exists but is not verified
            //     const verificationCode = generateVerificationCode();
            //     userExists.verificationCode = verificationCode;
            //     await userExists.save();
            //     await sendVerificationEmail(email, verificationCode);
            //     return res.status(200).json({ message: 'Verification code resent to your email' });
            // } else {
            return res.status(400).json({ message: 'User already exists and is verified' });
            //}
        }

        let newUser;
        // if (email === 'animallpublic@gmail.com') {
        //     newUser = await AuthModel.create({
        //         username,
        //         email,
        //         password,
        //         role: 'admin',
        //         verifyStatus: true,
        //         verificationCode: undefined
        //     });
        // } else {
        const verificationCode = generateVerificationCode();

        temporaryAccounts[email] = {
            username,
            email,
            password,
            role: 'user',
            verificationCode,
            verifyStatus: false,
            creationDate: new Date()
        };

        await sendVerificationEmail(email, verificationCode);

        //make verification code expire in 10 minute
        for (const [key, value] of Object.entries(temporaryAccounts)) {
            if (isVerificationCodeExpired(key)) {
                delete temporaryAccounts[key];
            }
        }

        res.status(201).json({ message: 'User registered successfully.', admin: email === 'animallpublic@gmail.com' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const isVerificationCodeExpired = (email) => {
    return temporaryAccounts[email].creationDate < new Date(new Date().getTime() - process.env.VERIFY_CODE_EXPIRY_MIN * 60000)
}

export const verifyUser = async (req, res) => {
    const { email, verificationCode } = req.body;

    try {
        const user = temporaryAccounts[email];
        // const user = await AuthModel.findOne({ email });

        if (!user || isVerificationCodeExpired(email)) {
            return res.status(404).json({ message: 'Verification code expired' });
        }

        if (user.verificationCode !== verificationCode) {
            return res.status(400).json({ message: 'Invalid verification code' });
        }

        user.verifyStatus = true;
        user.verificationCode = undefined; // Optionally, remove the verification code
        delete user["creationDate"];

        let newUser = await AuthModel.create(user);
        delete temporaryAccounts[email];

        // Activate the user by setting verifyStatus to true
        // user.verifyStatus = true;
        // user.verificationCode = undefined; // Optionally, remove the verification code
        //await user.save();

        res.status(200).json({ success: true, message: 'User verified and activated successfully' });
    } catch (error) {
        console.error('Error in verifyUser:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// In authController.js

export const createAdmin = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if the request is coming from an authorized source (e.g., admin user)
        // Add authentication/authorization logic here

        const existingAdmin = await AuthModel.findOne({ email: 'animallpublic@gmail.com' });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin account already exists' });
        }

        const admin = await AuthModel.create({ username: 'Admin', email: 'animallpublic@gmail.com', password: 'Animall1234!!' });

        res.status(201).json({
            _id: admin._id,
            username: admin.username,
            email: admin.email,
            message: 'Admin account created successfully',
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await AuthModel.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (!user.verifyStatus) {
            return res.status(403).json({ message: 'Your account has been blocked. Please contact administrator.' });
        }

        //res.cookie('token', generateToken(user._id));
        // const responseHeaders = {
        //     "Content-Type": "application/json",
        //     "set-cookie": [
        //         `authToken=${generateToken(user._id)}; Path=/; HttpOnly;`,
        //     ],
        // };

        // res.writeHead(200, responseHeaders);
        const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;
        res.cookie('token', generateToken(user._id), {
            httpOnly: true, secure: true, path: '/',
            sameSite: 'None', maxAge: oneYearInMilliseconds
        });

        res.json({
            userUid: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
            role: user.role,
            verifyStatus: user.verifyStatus,
            address: user.address,
            phone: user.phone,
        });
    } catch (error) {
        console.error("Login Error:", error); // Log the error for debugging
        res.status(500).json({ message: 'An error occurred while processing your request' });
    }
};

export const updateUserProfile = async (req, res) => {
    const { username, email, address, phone } = req.body;

    try {
        // Find the user by email and update their profile
        const user = await AuthModel.findOneAndUpdate(
            { email: email },
            { username: username, address: address, phone: phone },
            { new: true } // Return the updated document
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', user: user });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// export const getUser = async (req, res) => {
//     try {
//         const user = await AuthModel.findById(req.user.id).select('-password'); // Exclude the password field

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json({ user });
//     } catch (error) {
//         console.error('Error fetching user:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };


export const profile = async (req, res) => {
    try {
        const user = await AuthModel.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};





// export const sendPasswordResetEmail = async (req, res) => {
//     const { email } = req.body;
//     try {
//         const user = await AuthModel.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const resetToken = generateResetToken(user._id); // Generate reset token
//         const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

//         // Send password reset email with resetUrl
//         // Use nodemailer or your email service

//         res.json({ message: 'Password reset email sent' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

export const getUser = async (req, res) => {
    //from cookie
    const token = req.cookies.token;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await AuthModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.end();
        res.json({ message: 'logout successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const sendPasswordResetEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await AuthModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const verificationCode = generateVerificationCode(); // Generate a new verification code
        user.verificationCode = verificationCode;
        await user.save();

        await sendVerificationEmail(email, verificationCode); // Send the verification code to the user's email

        res.json({ message: 'Verification code sent to your email' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const verifyAndResetPassword = async (req, res) => {
    const { email, verificationCode, newPassword } = req.body;
    try {
        const user = await AuthModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.verificationCode !== verificationCode) {
            return res.status(400).json({ message: 'Invalid verification code' });
        }

        user.password = newPassword; // Update the password
        user.verificationCode = undefined; // Clear the verification code
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};







// Utility function to generate reset token
const generateResetToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

