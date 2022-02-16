import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bindRoutes from './routes.mjs';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(cors({
  credentials: true,
  origin: FRONTEND_URL,
}));

bindRoutes(app);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log('Listening on port 3004'));
