import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import { connectDB } from './config/db.js';
import roomRoutes from './routes/roomRoute.js';
import adminRoutes from './routes/adminRoute.js';
import userRoutes from './routes/userRoute.js';
import bookingRoutes from './routes/bookingRoute.js';

import cron from 'node-cron';
import moment from 'moment';
import nodemailer from 'nodemailer';
import Booking from './models/booking.model.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.use('/api/rooms', roomRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/booking', bookingRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is started at http://localhost:${PORT}`);
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pawin.suk@dome.tu.ac.th',
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

cron.schedule('* * * * *', async () => {
    const now = moment();
    const bookings = await Booking.find({ confirmStatus: "PENDING" });
    bookings.forEach(element => {
        if(moment(element.bookingStartTime).subtract(30, "minutes").format("HH:mm") == now.format("HH:mm")) {
            const mailOptions = {
                from: 'pawin.suk@dome.tu.ac.th',
                to: element.customerEmail,
                subject: 'Meeting Room Booking System',
                html: `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                            <table width="100%" style="max-width:600px;margin:auto;background-color:#ffffff;border:1px solid #dddddd;border-radius:6px;">
                            <tr>
                                <td style="background-color:#8C191C;color:#ffffff;padding:20px;text-align:center;font-size:24px;border-top-left-radius:6px;border-top-right-radius:6px;">
                                TSE Meeting Room
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:20px;font-size:16px;color:#000000; background-color:#ffffff">
                                <p>เรียนผู้ใช้งาน,</p>
                                <p><strong>Name:</strong> ${element.customerUsername} </p>
                                <p><strong>Email:</strong> ${element.customerEmail} </p>
                                <p><strong>Room:</strong> ${element.roomNameEN} </p>
                                <p><strong>Meeting:</strong> ${element.meetingName} </p>
                                <p><strong>ข้อความ:</strong><br>
                                กรุณากดยืนยันการเข้าใช้ห้องประชุมของคุณภายใน 30 นาที</p>
                                <a href="https://meeting-room-project-front-git-master-pawinfuls-projects.vercel.app/mybooking">Confirm Link</a>
                                </td>
                            </tr>
                            </table>
                        </body>`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if(error) {
                    console.log(error);
                } else {
                    console.log('Email send: ' + info.response);
                }
            });
        }
    });
})

cron.schedule('* * * * *', async () => {
    const now = moment();
    const bookings = await Booking.find({ confirmStatus: "CONFIRMED" });
    bookings.forEach(element => {
        if(moment(element.bookingEndTime).format("HH:mm") == now.format("HH:mm")) {
            const mailOptions = {
                from: 'pawin.suk@dome.tu.ac.th',
                to: element.customerEmail,
                subject: 'Meeting Room Booking System',
                html: ` <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                            <table width="100%" style="max-width:600px;margin:auto;background-color:#ffffff;border:1px solid #dddddd;border-radius:6px;">
                            <tr>
                                <td style="background-color:#8C191C;color:#ffffff;padding:20px;text-align:center;font-size:24px;border-top-left-radius:6px;border-top-right-radius:6px;">
                                TSE Meeting Room
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:20px;font-size:16px;color:#000000; background-color:#ffffff">
                                <p>เรียนผู้ใช้งาน,</p>
                                <p><strong>Name:</strong> ${element.customerUsername} </p>
                                <p><strong>Email:</strong> ${element.customerEmail} </p>
                                <p><strong>Room:</strong> ${element.roomNameEN} </p>
                                <p><strong>Meeting:</strong> ${element.meetingName} </p>
                                <p><strong>ข้อความ:</strong><br>
                                เวลาการใช้งานห้องประชุมของคุณได้หมดลงแล้ว</p>
                                </td>
                            </tr>
                            </table>
                        </body>`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if(error) {
                    console.log(error);
                } else {
                    console.log('Email send: ' + info.response);
                }
            });
        }        
    });
})

