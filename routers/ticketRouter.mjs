import express from 'express';
import TicketController from '../controllers/TicketController.mjs';
import db from '../models/index.mjs';
import checkAuth from '../middleware/auth.mjs';

const router = express.Router();
const controller = new TicketController(db.Ticket, db);

router.get('/winloss', checkAuth, controller.getWinLoss.bind(controller));

export default router;
