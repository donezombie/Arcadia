import { random } from 'lodash';
import { BotModel } from 'models/BotModel';

class FeatureService {
  getFeatureList() {
    // return httpService.get(GET_TODOS_URL);
    // const length = random(10, 24);
    // const data = Array.from(Array(length));
    const data = [1, 2];

    const returnData = data.map((el, index) => {
      const logo = 'https://www.pngitem.com/pimgs/m/124-1245793_ethereum-eth-icon-ethereum-png-transparent-png.png';
      const id = Math.floor(Math.random() * 100000);
      return new BotModel(
        logo,
        `Ethereum ${index + 1}`,
        'Use this bot to see information like balance, transactions, amount, fees and more about your crypto address',
        random(1, 20),
        id,
      );
    });

    return Promise.resolve(returnData);
  }
}

export default new FeatureService();
