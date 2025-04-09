import express from 'express';
import { approveBooking, book, getAllBooking, getAllPendingBooking, getBooking, getUserBookingHistory, getUserOngoingBooking, migrate } from '../controller/bookingController.js';

const router = express.Router();

router.get('/getUserBooking', getUserOngoingBooking);

router.get('/getBookingHistory', getUserBookingHistory);

router.post('/getBooking', getBooking);

router.get('/getPendingBooking', getAllPendingBooking);

router.get('/getAllBooking', getAllBooking);

router.post('/book', book);

router.put('/approveBooking', approveBooking);

router.post('/migrateTest', migrate);

export default router;