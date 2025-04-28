import express from 'express';
import { approveBooking, book, deleteBooking, editBooking, getAllBooking, getAllBookingByRoom, getAllPendingBooking, getBooking, getRoomOngoingBooking, getUserBookingHistory, getUserOngoingBooking, migrate } from '../controller/bookingController.js';

const router = express.Router();

router.get('/getUserBooking/:username', getUserOngoingBooking);

router.post('/getRoomBooking', getRoomOngoingBooking);

router.get('/getBookingHistory/:username', getUserBookingHistory);

router.post('/getBooking/:id', getBooking);

router.put('/editBooking/:id', editBooking);

router.delete('/deleteBooking/:id', deleteBooking);

router.get('/getPendingBooking', getAllPendingBooking);

router.get('/getAllBooking', getAllBooking);

router.get('/getAllBookingByRoom', getAllBookingByRoom);

router.post('/book', book);

router.put('/approveBooking', approveBooking);

router.post('/migrateTest', migrate);

export default router;