import {
  getAccessTokenAction,
  getNewAccessTokenAction,
} from '@/app/_actions/auth.action';
import axios from 'axios';
import { serverAddress } from '@/app/_data';

export const axiosInstance = axios.create({
  baseURL: serverAddress,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async function (config) {
    const accessToken = await getAccessTokenAction();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },

  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    return {
      ok: response?.data?.ok,
      data: response?.data?.data,
      meta: response?.data?.meta,
      message: response?.data.message,
    };
  },

  async function (error) {
    const config = error.config;
    const errorResponse = error.response?.data;
    const errorMessage = errorResponse?.message;
    const status = error.response?.status;

    if (
      errorMessage === 'Access Token Expired' &&
      status === 401 &&
      !config.sent
    ) {
      config.sent = true;
      const accessToken = await getNewAccessTokenAction();
      if (accessToken) {
        config.headers.Authorization = accessToken;
        return axiosInstance(config);
      }
    } else {
      return Promise.reject(error);
    }
  },
);
