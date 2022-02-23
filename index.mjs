import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import bindRoutes from './routers/index.mjs';

dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const PORT = process.env.PORT || 3004;

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(cors({
  credentials: true,
  origin: FRONTEND_URL,
}));

bindRoutes(app);

app.listen(PORT, () => console.log('Listening on port 3004'));
