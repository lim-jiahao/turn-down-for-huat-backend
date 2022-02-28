import express from 'express';
import UserController from '../controllers/UserController.mjs';
import db from '../models/index.mjs';
import checkAuth from '../middleware/auth.mjs';

const router = express.Router();
const controller = new UserController(db.User, db);

router.post('/login', controller.authUser.bind(controller));
router.post('/signup', controller.createUser.bind(controller));
router.get('/authenticate', checkAuth, controller.checkToken.bind(controller));
router.get('/self', checkAuth, controller.getUser.bind(controller));

export default router;
