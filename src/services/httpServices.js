import axios from 'axios';
import isString from 'lodash/isString';
import jwt from 'jsonwebtoken';
import { momentInstance } from 'helpers';
import { REFRESH_TOKEN_URL } from 'constants/api';

class Services {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
    });
    this.axios.defaults.withCredentials = true;

    this.get = this.axios.get;
    this.post = this.axios.post;
    this.put = this.axios.put;
    this.delete = this.axios.delete;
    this.patch = this.axios.patch;

    //! Request
    this.axios.interceptors.request.use(
      async function (config) {
        // Do something before request is sent
        const tokenHeader = config?.headers?.token || '';
        if (tokenHeader) {
          const tokenDecoded = jwt.decode(tokenHeader);
          const { exp } = tokenDecoded;
          const isExpired = momentInstance(exp * 1000).isSameOrBefore(momentInstance());
          if (isExpired) {
            const newToken = await axios.post(REFRESH_TOKEN_URL);
            this.attachTokenToHeader(newToken);
          }
        }

        return config;
      },
      function (error) {
        return Promise.reject(error);
      },
    );

    //! Response
    this.axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (isString(error?.response?.data?.message)) {
          return Promise.reject(error?.response?.data?.message);
        }

        if (isString(error?.response?.data?.error?.message)) {
          return Promise.reject(error?.response?.data?.error?.message);
        }

        return Promise.reject(error);
      },
    );
  }

  attachTokenToHeader(token) {
    this.axios.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        config.headers['token'] = token;
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      },
    );
  }

  removeInterceptors() {
    this.axios.interceptors.request.eject(this.interceptors);
  }

  source() {
    return this.axios.CancelToken.source();
  }

  isCancel(error) {
    return this.axios.isCancel(error);
  }
}

export default new Services();
