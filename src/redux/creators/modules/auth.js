import isEmpty from 'lodash/isEmpty';
import produce from 'immer';
import { put } from 'redux-saga/effects';
import authServices from 'services/authServices';
import httpServices from 'services/httpServices';
import apolloServices from 'services/apolloServices';

export const authActions = {
  checkAuth: 'checkAuth',
  logout: 'logout',
  saveInfoUser: 'saveInfoUser',
  saveInfoUserSuccess: 'saveInfoUserSuccess',
  saveInfoUserFailed: 'saveInfoUserFailed',
};

export const authSagas = {
  [authActions.checkAuth]: {
    saga: function* ({ payload = {} }) {
      const infoLocalStorage = authServices.getUserLocalStorage();
      if (!isEmpty(infoLocalStorage)) {
        const { token } = infoLocalStorage;
        yield put({ type: authActions.saveInfoUser, payload: { token } });
      } else {
        yield put({ type: authActions.saveInfoUserFailed });
      }
    },
  },
  [authActions.logout]: {
    saga: function* ({ payload = {} }) {
      yield authServices.clearUserLocalStorage();
      window.location.reload();
    },
  },
  [authActions.saveInfoUser]: {
    saga: function* ({ payload = {} }) {
      const { token } = payload;
      yield httpServices.attachTokenToHeader(token);
      yield apolloServices.client.setHeader('Authorization', `Bearer ${token}`);
      yield authServices.saveUserLocalStorage({ token });
      yield put({ type: authActions.saveInfoUserSuccess, token });
    },
  },
};

export const authReducer = (
  state = {
    auth: {
      token: '',
      isLogin: false,
      isCheckingAuth: false,
      error: null,
    },
  },
  action,
) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case authActions.checkAuth: {
        draftState.auth.isCheckingAuth = true;
        break;
      }

      case authActions.saveInfoUserSuccess: {
        draftState.auth.isLogin = true;
        draftState.auth.isCheckingAuth = false;
        draftState.auth.token = action.token;
        break;
      }

      case authActions.saveInfoUserFailed: {
        draftState.auth.isCheckingAuth = false;
        break;
      }

      default:
        break;
    }
  });
};
