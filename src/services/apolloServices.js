import { GraphQLClient } from 'graphql-request';
import authServices from './authServices';

class ApolloServices {
  constructor() {
    const { token } = authServices.getUserLocalStorage();
    this.client = new GraphQLClient(process.env.REACT_APP_BOT_BLOCK_URL, {
      headers: {
        Authorization: token ? `Bear ${token}` : '',
      },
    });
  }
}

export default new ApolloServices();
