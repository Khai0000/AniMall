import mongoose from "mongoose";
import { AuthModel } from "../Authentication/authModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { google } from 'googleapis';
const OAuth2 = google.auth.OAuth2;
import OAuth2Client from 'google-auth-library';
import axios, { isCancel, AxiosError } from 'axios';

// Utility function to generate verification code
export const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send verification email function
export const sendVerificationEmail = async (email, verificationCode) => {
    // Create an OAuth2 client
    //     "https://developers.google.com/oauthplayground");
    // // const oAuth2Client = new OAuth2Client(process.env.GMAIL_CLIENT_ID, process.env.GMAIL_CLIENT_SECRET, );

    // const params = new URLSearchParams();
    // params.append('client_id', process.env.GMAIL_CLIENT_ID);
    // params.append('client_secret', process.env.GMAIL_CLIENT_SECRET);
    // params.append('refresh_token', process.env.GMAIL_REFRESH_TOKEN);
    // params.append('grant_type', 'refresh_token');

    // let accessTokenTemp = ""
    // let refreshTokenTemp = ""
    // axios.post('https://oauth2.googleapis.com/token', params)
    //     .then(response => {
    //         console.log('Access token:', response.data.access_token);
    //         accessTokenTemp = response.data.access_token;
    //         console.log('Refresh token:', response.data.refresh_token);
    //         refreshTokenTemp = response.data.refresh_token;
    //     })
    //     .catch(error => {
    //         console.error('Error fetching access token:', error.response.data.error_description);
    //     });

    // const authUrl = oAuth2Client.generateAuthUrl({
    //     access_type: 'offline',
    //     scope: ['https://mail.google.com/'],
    //     // scope: ['https://www.googleapis.com/auth/gmail.send'],
    // });

    // Generate the OAuth2 URL for user consent
    // const authUrl = oAuth2Client.generateAuthUrl({
    //     access_type: 'offline',
    //     scope: ['https://www.googleapis.com/auth/gmail.send'],
    // });
    //https://mail.google.com/

    //const code = 'xxxx'
    //const { tokens } = await oauth2Client.getToken(code)
    //oauth2Client.setCredentials(tokens);

    const oAuth2Client = new OAuth2(process.env.GMAIL_CLIENT_ID, process.env.GMAIL_CLIENT_SECRET);

    oAuth2Client.setCredentials({
        refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    // const accessToken = process.env.GMAIL_ACCESS_TOKEN

    const accessToken = await new Promise((resolve, reject) => {
        oAuth2Client.getAccessToken((err, token) => {
            if (err) {
                console.log("*ERR: ", err)
                reject();
            }
            resolve(token);
        });
    });

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            type: "OAuth2",
            clientId: process.env.GMAIL_CLIENT_ID,
            clientSecret: process.env.GMAIL_CLIENT_SECRET,
        },
    });

    transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        text: `Your verification code is: ${verificationCode}`,
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL_USER,
            accessToken,
            clientId: process.env.GMAIL_CLIENT_ID,
            clientSecret: process.env.GMAIL_CLIENT_SECRET,
            refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        },
        // auth: {
        //     user: "user@example.com",
        //     refreshToken: "1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx",
        //     accessToken: "ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x",
        //     expires: 1484314697598,
        // },
    });

    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: process.env.EMAIL_USER,
    //         pass: process.env.EMAIL_PASS,
    //     },
    // });

    // const mailOptions = {
    //     from: process.env.EMAIL_USER,
    //     to: email,
    //     subject: 'Email Verification',
    //     text: `Your verification code is: ${verificationCode}`,
    // };

    // await transporter.sendMail(mailOptions);
};
