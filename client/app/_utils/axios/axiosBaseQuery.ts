import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { axiosInstance } from './axiosInstance';

export const axiosBaseQuery = ({ baseUrl } = { baseUrl: '' }): BaseQueryFn => {
  return async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });

      return { data: result?.data };
    } catch (err: any) {
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
};
