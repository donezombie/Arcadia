import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const useSagaCreators = () => {
  const dispatchRedux = useDispatch();

  const dispatch = useCallback(
    (type, payload) => {
      return dispatchRedux({ type, payload });
    },
    [dispatchRedux],
  );

  return {
    dispatch,
  };
};

export default useSagaCreators;
