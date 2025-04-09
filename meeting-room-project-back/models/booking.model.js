import mongoose from 'mongoose';

const BookingSchema = mongoose.Schema(
    {
        meetingName: {
            type: String,
            required: true
        },
        meetingDescription: {
            type: String,
            required: true
        },
        roomNameTH: {
            type: String,
            required: true
        },
        roomNameEN: {
            type: String,
            required: true
        },
        customerUsername: {
            type: String,
            required: true
        },
        customerDepartment: {
            type: String,
            required: true
        },
        customerEmail: {
            type: String,
            required: true
        },
        bookingStartTime: {
            type: Date,
            required: true
        },
        bookingEndTime: {
            type: Date,
            required: true
        },
        requireApprove: {
            type: Boolean,
            required: true
        },
        approver: {
            type: String,
            required: true,
            default: "PENDING"
        },
        approveAt: {
            type: Date
        },
        bookingStatus: {
            type: String,
            required: true,
            default: "PENDING"
        }
    },
    {
        timestamps: true
    }
)

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;