import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import { connectDB } from './config/db.js';
import roomRoutes from './routes/roomRoute.js';
import adminRoutes from './routes/adminRoute.js';
import userRoutes from './routes/userRoute.js';
import bookingRoutes from './routes/bookingRoute.js';

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