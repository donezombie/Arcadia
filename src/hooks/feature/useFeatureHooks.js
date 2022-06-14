import { useQuery } from 'react-query';
import featureServices from 'services/featureServices';
import setupServices from 'services/setupServices';

export const useGetFeatureList = () => {
  return useQuery('features', featureServices.getFeatureList);
};

export const useGetBlockchainScanner = (variables) => {
  return useQuery('setup', () => setupServices.getTransactions(variables));
};
