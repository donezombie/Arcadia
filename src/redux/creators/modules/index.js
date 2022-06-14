import { combineReducers as combineReducersRedux } from 'redux';

import { authSagas, authReducer } from './auth';

const combineSaga = {
  ...authSagas,
};

const combineReducers = combineReducersRedux({
  authReducer,
});

export { combineSaga, combineReducers };
