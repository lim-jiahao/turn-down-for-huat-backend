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
          win += Number(bet.profit) - 1;
        });
      });

      res.send({ win });
    } catch (error) { res.status(503).send({ error }); }
  }
}
