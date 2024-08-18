import { serverAddress } from '@/app/_data';
import { axiosBaseQuery } from '@/app/_utils/axios';
import { createApi } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: serverAddress }),
  endpoints: () => ({}),
  tagTypes: ['categories'],
});
