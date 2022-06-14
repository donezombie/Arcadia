import { useSelector } from 'react-redux';

export const GetRegisterSelector = () => {
  const register = useSelector((state) => state.registerReducer.register);
  return register;
};
