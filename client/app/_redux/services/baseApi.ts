import { serverAddress } from '@/app/_data';
import { axiosBaseQuery } from '@/app/_utils/axios/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: serverAddress }),
  endpoints: () => ({}),
  tagTypes: [],
});
