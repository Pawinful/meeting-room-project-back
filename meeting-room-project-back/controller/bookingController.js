import mongoose from 'mongoose';
import Booking from '../models/booking.model.js';
import User from '../models/user.model.js';
import Room from '../models/room.model.js';

export const getUserOngoingBooking = async (req, res) => {
    // const body = req.body;
    const params = req.params;
    const user = await User.findOne({ username: params.username });
    try {
        const userOngoingBooking = await Booking.find().where("_id").in(user.ongoingBooking).exec();
        return res.status(200).json({ success: true, data: userOngoingBooking })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getRoomOngoingBooking = async (req, res) => {
    const body = req.body;
    // const room = await Room.findOne({ username: body.roomNameEN });
    try {
        const userOngoingBooking = await Booking.find({ roomNameEN: body.roomNameEN });
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
        const AllBookings = await Booking.find();
        return res.status(200).json({ success: true, data: AllBookings });
    } catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
}

export const getAllBookingByRoom = async (req, res) => {
    const body = req.body;
    try {
        const bookings = await Booking.find({ roomNameEN: body.roomNameEN });
        return res.status(200).json({ success: true, data: bookings });
    } catch(e) {
        return res.status(404).json({ success: false, message: e.message });
    }
}

export const getUserBookingHistory = async (req, res) => {
    const body = req.body;
    const params = req.params;
    const user = await User.findOne({ username: params.username });
    try {
        const userBookingHistory = await Booking.find().where("_id").in(user.bookingHistory).exec();
        return res.status(200).json({ success: true, data: userBookingHistory });
    } catch(error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const getBooking = async (req, res) => {
    const {id} = req.params
    try {
        const booking = await Booking.findOne({ _id: id });
        return res.status(200).json({ success: true, data: booking });
    } catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
}

export const editBooking = async (req, res) => {
    const newBooking = req.body;
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Booking not found!" });
    }

    try {
        const updatedBooking = await Booking.findByIdAndUpdate(id, newBooking, {new: true});
        res.status(200).json({ success: true, data: updatedBooking });
    } catch(e) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const deleteBooking = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success:false, message: "Booking not found!" });
    }
    try {
        await Booking.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: `Booking id:${id} has been deleted successfully` });
    } catch(e) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
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
            roomId: body.roomId,
            customerUsername: body.customerUsername,
            customerDepartment: body.customerDepartment,
            customerEmail: body.customerEmail,
            bookingStartTime: body.bookingStartTime,
            bookingTime: body.bookingTime,
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