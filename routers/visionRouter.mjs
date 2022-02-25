import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import fs from 'fs';
import moment from 'moment';
import vision from '@google-cloud/vision';

const router = express.Router();
const multerUpload = multer({ dest: 'uploads/' });

dotenv.config();
const googleCredentials = fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS);

const client = new vision.ImageAnnotatorClient({
  credentials: JSON.parse(googleCredentials),
});

const checkTicket = async (req, res) => {
  try {
    const [result] = await client.textDetection(`uploads/${req.file.filename}`);
    const text = result.fullTextAnnotation?.text;

    if (!text) {
      res.status(400).json({ error: 'No text detected!' });
      return;
    }

    const drawNum = text.match(/[0-9]{4}[/][0-9]{2}/g);
    if (!drawNum || drawNum.length === 0) {
      res.status(400).json({ error: 'No draw number found!' });
      return;
    }

    const numbers = text.match(/\d{2}\s\d{2}\s\d{2}\s\d{2}\s\d{2}\s\d{2}/g);
    if (!numbers || numbers.length === 0) {
      res.status(400).json({ error: 'No bet numbers found!' });
      return;
    }

    const date = text.match(/\d{2}[/]\d{2}[/]\d{2}/g);
    if (!date) {
      res.status(400).json({ error: 'No draw date found!' });
      return;
    }

    const draw = drawNum[0].split('/')[0];
    const bets = numbers.map((bet) => bet.replaceAll(' ', ','));
    res.json({
      draw,
      bets,
      date: moment(date, 'DD/MM/YY').format('dddd, MMMM Do YYYY'),
      ticket: req.file.filename,
    });
  } catch (error) { res.status(503).send({ error }); }
};

router.post('/', multerUpload.single('ticket'), checkTicket);

export default router;
