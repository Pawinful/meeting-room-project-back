import express from 'express';
import { approveBooking, book, getAllBooking, getAllPendingBooking, getBooking, getRoomOngoingBooking, getUserBookingHistory, getUserOngoingBooking, migrate } from '../controller/bookingController.js';

const router = express.Router();

router.get('/getUserBooking/:username', getUserOngoingBooking);

router.get('/getRoomBooking', getRoomOngoingBooking);

router.get('/getBookingHistory/:username', getUserBookingHistory);

router.post('/getBooking', getBooking);

router.get('/getPendingBooking', getAllPendingBooking);

router.get('/getAllBooking', getAllBooking);

router.post('/book', book);

router.put('/approveBooking', approveBooking);

router.post('/migrateTest', migrate);

export default router;