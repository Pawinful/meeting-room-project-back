import mongoose from 'mongoose';
import Room from '../models/room.model.js';

export const getAllRoom = async (req, res) => {
    try {
        const Rooms = await Room.find({});
        res.status(200).json({ success: true, data: Rooms});
    } catch (error) {
        console.log("Error fetching data: ", error.message);
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
}

export const getRoom = async (req, res) => {
    const room = req.body;
    const params = req.params

    try {
        const Rooms = await Room.findOne({ _id: params }).exec();
        res.status(200).json({ success: true, data: Rooms });
    } catch (e) {
        console.log("Error fetching data: ", e.message);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const addRoom = async (req, res) => {
    const room = req.body; // data from user's request
    const newRoom = new Room(room);
    const checkRoom = await Room.exists({ roomNameEN: room.roomNameEN });
    console.log(checkRoom);

    if(checkRoom != null) {
        return res.status(500).json({ success: false, data: checkRoom });
    }

    try{
        await newRoom.save();
        res.status(201).json({ success: true, data: newRoom});
    } catch(error) {
        console.error("Error creating room: ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}

export const deleteRoom = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Room id not found!" });
    }

    try {
        await Room.findByIdAndDelete(id);
        res.status(200).json({success: true, message: `Room id ${id} has deleted successfully`});
    } catch(e) {
        console.log("Error deleting room: ", e.message);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export const editRoom = async (req, res) => {
    const {id} = req.params; // get id from parameter '{}' is required for parameter variable
    const room = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Room id not found!" });
    }

    try {
        const updatedRoom = await Room.findByIdAndUpdate(id, room, {new: true});
        res.status(200).json({success: true, data: updatedRoom});
    } catch(e) {
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}