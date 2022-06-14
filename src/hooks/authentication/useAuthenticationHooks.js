import authServices from 'services/authServices';
import { useMutation } from 'react-query';
import { GetAuthSelector } from 'redux/selectors';

export const useGetUser = () => {
  const user = GetAuthSelector();
  return user
}

export const useSignUp = () => {
  return useMutation(authServices.signUp);
};

export const useLogin = () => {
  return useMutation(authServices.login);
};
