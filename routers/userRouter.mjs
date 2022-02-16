import express from 'express';
import UserController from '../controllers/UserController.mjs';
import db from '../models/index.mjs';

const router = express.Router();
const controller = new UserController(db.User, db);

router.post('/login', controller.authUser.bind(controller));
router.post('/signup', controller.createUser.bind(controller));

export default router;
