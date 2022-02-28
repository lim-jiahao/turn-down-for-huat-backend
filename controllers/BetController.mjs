import axios from 'axios';
import BaseController from './BaseController.mjs';

export default class BetController extends BaseController {
  // eslint-disable-next-line class-methods-use-this
  async check(req, res) {
    const { bet, draw } = req.body;

    const data = {
      drawNumber: draw,
      isHalfBet: 'false',
      numbers: bet,
      partsPurchased: '1',
      totalNumberOfParts: '1',
    };
    try {
      const results = await axios.post('https://www.singaporepools.com.sg/_layouts/15/TotoApplication/TotoCommonPage.aspx/CalculatePrizeForTOTO', data);
      const info = JSON.parse(results.data.d);

      if (!info.WinningNumbers || info.WinningNumbers.length === 0) {
        res.status(400).json({ error: 'Results not out yet for this draw!' });
        return;
      }

      let prize = 0;
      if (info.Prizes.length > 0) {
        prize = info.Prizes.reduce((acc, cur) => acc + cur.Total, 0);
      }

      const respData = {
        winningNumbers: info.WinningNumbers.join(','),
        prize,
        additionalNumber: info.AdditionalNumber,
      };
      res.send(respData);
    } catch (error) {
      res.status(503).send({ error });
    }
  }

  async save(req, res) {
    const { numbers, prizes, filename } = req.body;
    const { id } = req.userInfo;
    try {
      const ticket = await this.db.Ticket.create({
        filename,
        userId: id,
      });

      const costs = {
        6: 1,
        7: 7,
        8: 28,
        9: 84,
        10: 210,
        11: 462,
        12: 924,
      };

      const promises = [];
      numbers.forEach((set, i) => {
        const numberArr = set.split(',');
        const [digitOne, digitTwo, digitThree, digitFour, digitFive, digitSix,
          digitSeven, digitEight, digitNine, digitTen, digitEleven, digitTwelve] = numberArr;
        promises.push(this.model.create({
          digitOne,
          digitTwo,
          digitThree,
          digitFour,
          digitFive,
          digitSix,
          digitSeven,
          digitEight,
          digitNine,
          digitTen,
          digitEleven,
          digitTwelve,
          profit: prizes[i],
          cost: costs[numberArr.length],
          ticketId: ticket.id,
        }));
      });

      const bets = await Promise.all(promises);
      const winLoss = bets.reduce((acc, cur) => acc + Number(cur.profit) - Number(cur.cost), 0);

      res.json({ bets, winLoss });
    } catch (error) {
      res.status(503).send({ error });
    }
  }
}
