import express from 'express';
import BetController from '../controllers/BetController.mjs';
import db from '../models/index.mjs';

const router = express.Router();
const controller = new BetController(db.Bet, db);

router.post('/check', controller.check.bind(controller));

export default router;
