import { BLOCK_ROOT_URL } from 'constants/api';
import { BotModel } from 'models/BotModel';
import httpServices from './httpServices';

class SetupServices {
  getTransactions(variables) {
    const graphqlQuery = {
      operationName: 'getBitQueryData',
      query: `query getBitQueryData($address: String!, $network: String!, $start: String, $end: String, $comeIn: Boolean) {
              transactions(idWallet: $address, network: $network, comeIn: $comeIn, start: $start, end: $end) {
                amount
                gas
                gasPrice
                sender {
                  address
                  annotation
                }
              }
            }`,
      variables: BotModel.parseRequestFilters(variables),
    };
    return httpServices.post(BLOCK_ROOT_URL, graphqlQuery);
  }
}

export default new SetupServices();
