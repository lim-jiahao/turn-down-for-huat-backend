import axios from 'axios';
import BaseController from './BaseController.mjs';

export default class BetController extends BaseController {
  async check(req, res) {
    const { numbersChecked } = req.body;
    const numbers = numbersChecked.reduce((acc, cur, i) => {
      if (!cur) return acc;
      if (cur) {
        if (i + 1 < 10) return `${acc},0${i + 1}`;
        return `${acc},${i + 1}`;
      }
    },
    '').slice(1);

    const data = {
      drawNumber: '3740',
      isHalfBet: 'false',
      numbers,
      partsPurchased: '1',
      totalNumberOfParts: '1',
    };

    const results = await axios.post('https://www.singaporepools.com.sg/_layouts/15/TotoApplication/TotoCommonPage.aspx/CalculatePrizeForTOTO', data);
    results.data.numbers = numbers;
    res.send(results.data);
  }
}
