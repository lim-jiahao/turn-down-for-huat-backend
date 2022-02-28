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

    // cannot find text in ticket
    if (!text) {
      res.status(400).json({ error: 'No text detected!' });
      return;
    }

    // match 'ORDINARY' or 'SYSTEM 7-12'
    let systemNum;
    const system = text.match(/SYSTEM\s([7-9]|1[0-2])/g);
    if (system) {
      systemNum = Number(system[0].split(' ')[1]);
    } else if (text.includes('ORDINARY')) {
      systemNum = 6;
    } else {
      res.status(400).json({ error: 'No bet type found!' });
      return;
    }

    // find draw num
    // pattern in ticket is 4-digit draw num / two-digit year e.g. 3437/19
    const drawNum = text.match(/[0-9]{4}[/][0-9]{2}/g);
    if (!drawNum || drawNum.length === 0) {
      res.status(400).json({ error: 'No draw number found!' });
      return;
    }

    // find bets
    // if systemNum = n, match n-1 occurences of a number with a space, and 1 occurence of a number
    const betRegex = new RegExp(`([0-4][0-9]\\s){${systemNum - 1}}[0-4][0-9]`, 'g');
    const numbers = text.match(betRegex);
    if (!numbers || numbers.length === 0) {
      res.status(400).json({ error: 'No valid bets found!' });
      return;
    }

    // find draw date which is in DD/MM/YY format
    const date = text.match(/\d{2}[/]\d{2}[/]\d{2}/g);
    if (!date) {
      res.status(400).json({ error: 'No draw date found!' });
      return;
    }

    const draw = drawNum[0].split('/')[0];
    const bets = numbers.map((bet) => bet.replaceAll(/\s/g, ','));
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
