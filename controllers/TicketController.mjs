import { rm } from 'fs';
import BaseController from './BaseController.mjs';

export default class TicketController extends BaseController {
  async getWinLoss(req, res) {
    try {
      const { id } = req.userInfo;
      const tickets = await this.model.findAll({
        where: {
          userId: id,
        },
        include: this.db.Bet,
      });
      let win = 0;

      tickets.forEach((ticket) => {
        ticket.bets.forEach((bet) => {
          win += Number(bet.profit) - Number(bet.cost);
        });
      });

      res.send({ win });
    } catch (error) { res.status(503).send({ error }); }
  }

  async deletePicture(req, res) {
    try {
      const ticket = await this.model.findOne({
        where: {
          filename: req.params.filename,
        },
      });

      if (!ticket) {
        res.status(401).json({ error: 'An error occured' });
        return;
      }

      await this.db.Bet.destroy({
        where: {
          ticketId: ticket.id,
        },
      });

      rm(`uploads/${req.params.filename}`, (err) => {
        if (err) throw err;
      });
      await ticket.destroy();
      res.json({ status: 'success' });
    } catch (error) {
      res.status(503).send({ error });
    }
  }
}
