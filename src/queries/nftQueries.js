import { gql } from '@apollo/client';

const NFT = gql`
  query getNFTQueryData($contractAddress: String!, $tokenId: String, $limit: String, $chain: String) {
    transfers(contractAddress: $contractAddress, tokenId: $tokenId, limit: $limit, chain: $chain) {
      contractAddress
      tokenId
      blockNumber
      transactionHash
      fromAddress
      toAddress
      value
      amount
      chain
      timestamp
      markets
    }
  }
`;

export { NFT };
