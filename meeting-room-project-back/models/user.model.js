import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
    {
        displayNameTH: {
            type: String,
            required: true
        },
        displayNameEN: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        department: {
            type: String,
            required: true
        },
        faculty: {
            type: String,
            required: true
        },
        bookingHistory: {
            type: [String],
            default: []
        },
        ongoingBooking: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", UserSchema);

export default User;