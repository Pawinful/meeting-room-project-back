import express from 'express';
import { addRoom, deleteRoom, editRoom, getAllRoom, getRoom } from '../controller/roomController.js';

const router = express.Router();

router.post('/addRoom', addRoom);

router.get('/getAllRoom', getAllRoom);

router.get('/getRoom/:_id', getRoom);

router.delete('/deleteRoom/:id', deleteRoom);

router.put('/editRoom/:id', editRoom);

export default router;