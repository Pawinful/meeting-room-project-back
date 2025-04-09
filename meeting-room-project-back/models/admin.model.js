import mongoose from 'mongoose';

const AdminSchema = mongoose.Schema(
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
            required: true,
            default: "คณะวิศวกรรมศาสตร์"
        },
        faculty: {
            type: String,
            required: true,
            default: "คณะวิศวกรรมศาสตร์"
        }
    },
    {
        timestamps: true
    }
)

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;