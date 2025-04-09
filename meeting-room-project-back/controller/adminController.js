import mongoose from 'mongoose';
import Admin from '../models/admin.model.js';
import axios from 'axios';

async function TULogin(loginData) {
    const loginResponse = await axios.post(process.env.TULOGIN_URI, loginData, {
        headers: {
            "Content-Type": "application/json",
            "Application-Key": process.env.TU_APPLICATION_KEY
        }
    })
    .then((response) => response.data)
    .catch((e) => {
        console.log("login Failed: " + e.message);
        return e.message
    })

    return loginResponse;
}

export const login = async (req, res) => {
    const loginData = req.body;
    if(loginData.UserName == "admin" && loginData.PassWord == "admin") {
        // ==start== remove this when deploy
        const data = {
            "status": true,
            "message": "Success",
            "type": "admin",
            "username": "admin",
            "tu_status": "ปกติ",
            "statusid": "10",
            "displayname_th": "แอดมิน แอดมิน",
            "displayname_en": "admin admin",
            "email": "admin@tse.meetingroom.com",
            "department": "คณะวิศวกรรมศาสตร์",
            "faculty": "คณะวิศวกรรมศาสตร์",
        }

        const checkAdmin = await Admin.exists({ username: data.username });
        if(checkAdmin == null) {
            const newAdmin = new Admin(
                {
                    displayNameTH: data.displayname_th,
                    displayNameEN: data.displayname_en,
                    username: data.username,
                    email: data.email,
                    department: data.department,
                    faculty: data.faculty
                }
            );
    
            await newAdmin.save();
            console.log("new admin data added!");
        }

        return res.status(200).json({ success: true, data: data })
        // ==end== remove this when deploy
    } else {
        TULogin(loginData)
        .then(async data => {
            if(data.status) {
                if(data.type == "student") {
                    console.log("Error: Student login as admin")
                    return res.status(400).json({ success: false, message: "This is student account" });
                }
                const checkAdmin = await Admin.exists({ username: data.username });
                if(checkAdmin == null) {
                    const newAdmin = new Admin(
                        {
                            displayNameTH: data.displayname_th,
                            displayNameEN: data.displayname_en,
                            username: data.username,
                            email: data.email,
                            department: data.department,
                            faculty: data.faculty
                        }
                    );

                    await newAdmin.save();
                    console.log("new admin data added!");
                }
                return res.status(200).json({ success: true, data: data });
            } else {
                console.log("Error: Unauthorized")
                return res.status(401).json({ success: false, message: data });
            }
        })
    }
}