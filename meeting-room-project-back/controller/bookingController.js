import mongoose from 'mongoose';
import Booking from '../models/booking.model.js';
import User from '../models/user.model.js';

export const getUserOngoingBooking = async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ username: body.username });
    try {
        const userOngoingBooking = await Booking.find().where("_id").in(user.ongoingBooking).exec();
        return res.status(200).json({ success: true, data: userOngoingBooking })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getAllPendingBooking = async (req, res) => {
    try {
        const pendingBookings = await Booking.find({ bookingStatus: "PENDING" }).exec();
        return res.status(200).json({ success: true, data: pendingBookings });
    } catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
}

export const getAllBooking = async (req, res) => {
    try {
        const AllBookings = await Booking.find({ bookingStatus: {$ne: "PENDING"} });
        return res.status(200).json({ success: true, data: AllBookings });
    } catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
}

export const getUserBookingHistory = async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ username: body.username });
    try {
        const userBookingHistory = await Booking.find().where("_id").in(user.bookingHistory).exec();
        return res.status(200).json({ success: true, data: userBookingHistory });
    } catch(error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const getBooking = async (req, res) => {
    const body = req.body;
    try {
        const booking = await Booking.findOne({ _id: body.id });
        return res.status(200).json({ success: true, data: booking });
    } catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
}

export const book = async (req, res) => {
    const body = req.body;
    try {
        const newBooking = new Booking({
            meetingName: body.meetingName,
            meetingDescription: body.meetingDescription,
            roomNameTH: body.roomNameTH,
            roomNameEN: body.roomNameEN,
            customerUsername: body.customerUsername,
            customerDepartment: body.customerDepartment,
            customerEmail: body.customerEmail,
            bookingStartTime: body.bookingStartTime,
            bookingEndTime: body.bookingEndTime,
            requireApprove: body.requireApprove,
        })

        await newBooking.save();

        await User.updateOne({ username: body.customerUsername }, {$push: {ongoingBooking: newBooking._id}});

        return res.status(200).json({ success: true, data: newBooking });
    } catch(error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const approveBooking = async (req, res) => {
    const body = req.body;
    try {
        await Booking.findByIdAndUpdate({ _id: body._id }, body);
        const approvedBooking = await Booking.findById(body._id);
        res.status(200).json({ success: true, data: approvedBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// remove this when deploy
export const migrate = async (req, res) => {
    const body = req.body;
    try {
        const newBooking = new Booking({
            meetingName: body.meetingName,
            meetingDescription: body.meetingDescription,
            customerUsername: body.customerUsername,
            customerDepartment: body.customerDepartment,
            customerEmail: body.customerEmail,
            bookingStartTime: body.bookingStartTime,
            bookingEndTime: body.bookingEndTime,
            requireApprove: body.requireApprove,
        })

        await newBooking.save();

        await User.updateOne({username: body.customerUsername},{$push: {ongoingBooking: newBooking._id}});
        
        return res.status(200).json({ success: true, data: newBooking });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}