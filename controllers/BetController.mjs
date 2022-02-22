import axios from 'axios';
import BaseController from './BaseController.mjs';

export default class BetController extends BaseController {
  // eslint-disable-next-line class-methods-use-this
  async check(req, res) {
    const { numbersChecked } = req.body;
    const numbers = numbersChecked.reduce((acc, cur, i) => {
      if (cur) {
        if (i + 1 < 10) return `${acc},0${i + 1}`;
        return `${acc},${i + 1}`;
      }
      return acc;
    },
    '').slice(1);

    const data = {
      drawNumber: '3740',
      isHalfBet: 'false',
      numbers,
      partsPurchased: '1',
      totalNumberOfParts: '1',
    };
    try {
      const results = await axios.post('https://www.singaporepools.com.sg/_layouts/15/TotoApplication/TotoCommonPage.aspx/CalculatePrizeForTOTO', data);
      const info = JSON.parse(results.data.d);

      const respData = {
        winningNumbers: info.WinningNumbers.join(','),
        prize: info.Prizes.length > 0 ? Number(info.Prizes[0].Total) : 0,
        additionalNumber: info.AdditionalNumber,
        numbers,
      };
      res.send(respData);
    } catch (error) {
      res.status(503).send({ error });
    }
  }

  async save(req, res) {
    const { numbers, prize } = req.body;
    const { id } = req.userInfo;
    try {
      const ticket = await this.db.Ticket.create({
        filename: 'abc',
        userId: id,
      });

      const [digitOne, digitTwo, digitThree, digitFour, digitFive, digitSix] = numbers.split(',');

      const bet = await this.model.create({
        digitOne,
        digitTwo,
        digitThree,
        digitFour,
        digitFive,
        digitSix,
        profit: prize,
        ticketId: ticket.id,
      });

      res.json({ bet });
    } catch (error) {
      res.status(503).send({ error });
    }
  }
}
