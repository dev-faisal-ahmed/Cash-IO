import { getAccessTokenAction } from '@/app/_actions/auth.action';
import { serverAddress } from '@/app/_data';
import { axiosBaseQuery } from '@/app/_utils/axios/axiosBaseQuery';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const baseQuery = fetchBaseQuery({
//   baseUrl: `${serverAddress}`,
//   prepareHeaders: async (headers) => {
//     const token = await getAccessTokenAction();
//     if (token) {
//       headers.set('authorization', `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: serverAddress }),
  // baseQuery,
  endpoints: () => ({}),
  tagTypes: ['categories'],
});
