import mongoose from 'mongoose';

const RoomSchema = mongoose.Schema(
    {
        roomNameTH: {
            type: String,
            required: [true, "Please enter Room Number TH"]
        },
        roomNameEN: {
            type: String,
            required: [true, "Please enter Room Number EN"]
        },
        roomImage: {
            type: String,
            required: true
        },
        branch: {
            type: String,
            required: [true, "Please enter University branch"],
            default: "RANGSIT"
        },
        building: {
            type: String,
            required: [true, "Please enter building"]
        },
        seat: {
            type: Number,
            required: [true, "Please enter seat"],
            default: 0
        },
        roomType: {
            type: String,
            required: [true, "Please enter Room type"],
            default: "MEETING_ROOM"
        },
        status: {
            type: Number,
            required: [true, "Please enter Room status"],
            default: 0
        },
        note: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const Room = mongoose.model("Room", RoomSchema);

export default Room;