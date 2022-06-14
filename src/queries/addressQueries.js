import { gql } from '@apollo/client';

const ETHEREUM = gql`
  query getBitQueryData($address: String!, $network: String!, $start: String, $end: String, $comeIn: Boolean) {
    transactions(idWallet: $address, network: $network, comeIn: $comeIn, start: $start, end: $end) {
      amount
      gas
      gasPrice
      sender {
        address
        annotation
      }
    }
  }
`;

export { ETHEREUM };
