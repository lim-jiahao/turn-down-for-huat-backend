import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import BaseController from './BaseController.mjs';
import getPasswordHash from '../utils/hash.mjs';

dotenv.config();
const { SALT } = process.env;

export default class UserController extends BaseController {
  async authUser(req, res) {
    try {
      const user = await this.model.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!user) {
        res.status(401).json({ error: 'Invalid login credentials' });
        return;
      }

      const hashedPassword = getPasswordHash(req.body.password);
      if (user.password !== hashedPassword) {
        res.status(401).json({ error: 'Invalid login credentials' });
        return;
      }

      const payload = { id: user.id, username: user.name, email: user.email };
      const token = jwt.sign(payload, SALT, { expiresIn: '1 day' });

      res.json({ token });
    } catch (error) { res.status(503).send({ error }); }
  }

  async createUser(req, res) {
    try {
      const userCheck = await this.model.findAll({
        where: {
          email: req.body.email,
        },
      });

      if (userCheck.length > 0) {
        res.status(401).json({ error: 'Email exists' });
        return;
      }

      const hashedPassword = getPasswordHash(req.body.password);

      const user = await this.model.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      const payload = { id: user.id, username: user.name, email: user.email };
      const token = jwt.sign(payload, SALT, { expiresIn: '1 day' });
      res.json({ token });
    } catch (error) { res.status(503).send({ error }); }
  }

  async getUser(req, res) {
    try {
      const user = await this.model.findByPk(req.userInfo.id, {
        include: [
          {
            model: this.db.Ticket,
            include: [
              {
                model: this.db.Bet,
              },
            ],
          },
        ],
      });

      if (!user) {
        res.status(401).json({ error: 'An error occured' });
        return;
      }

      const tickets = user.tickets.map((ticket) => {
        const bets = ticket.bets.map((bet) => {
          let betStr = `${bet.digitOne}, ${bet.digitTwo}, ${bet.digitThree}, ${bet.digitFour}, ${bet.digitFive}, ${bet.digitSix}`;
          if (bet.digitSeven) betStr += `, ${bet.digitSeven}`;
          if (bet.digitEight) betStr += `, ${bet.digitEight}`;
          if (bet.digitNine) betStr += `, ${bet.digitNine}`;
          if (bet.digitTen) betStr += `, ${bet.digitTen}`;
          if (bet.digitEleven) betStr += `, ${bet.digitEleven}`;
          if (bet.digitTwelve) betStr += `, ${bet.digitTwelve}`;
          return betStr;
        });
        const profit = ticket.bets.reduce((acc, cur) => acc + Number(cur.profit), 0);
        const cost = ticket.bets.reduce((acc, cur) => acc + Number(cur.cost), 0);

        return {
          bets,
          profit,
          cost,
          filename: ticket.filename,
          created: moment(ticket.createdAt).format('Do MMM YYYY, h:mm:ss a'),
        };
      });

      res.json({ user, tickets });
    } catch (error) {
      res.status(503).send({ error });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async checkToken(req, res) {
    res.json({ valid: true, userInfo: req.userInfo });
  }
}
