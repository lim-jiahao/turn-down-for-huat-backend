import express from 'express';
import BetController from '../controllers/BetController.mjs';
import db from '../models/index.mjs';
import checkAuth from '../middleware/auth.mjs';

const router = express.Router();
const controller = new BetController(db.Bet, db);

router.post('/check', controller.check.bind(controller));
router.post('/save', checkAuth, controller.save.bind(controller));

export default router;
