import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  CategoriesType,
  ServerResponseType,
  WalletType,
} from '@/lib/data-types';
import { serverAddress } from '@/data/server-address';
import { WalletForTransactionType } from '@/lib/server-types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${serverAddress}/api` }),
  tagTypes: ['wallets', 'categories', 'transactions'],

  endpoints: (builder) => ({
    getWallets: builder.query<WalletType[], string>({
      query: (email) => `/get-wallets?email=${email}`,
      providesTags: ['wallets'],
    }),

    getWalletForTransaction: builder.query<WalletForTransactionType, string>({
      query: (email) => `/get-wallets/for-transaction?email=${email}`,
      providesTags: ['wallets'],
    }),

    addWallet: builder.mutation<ServerResponseType, any>({
      query: (data) => ({
        url: '/add-wallet',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['wallets'],
    }),

    editWallet: builder.mutation<ServerResponseType, any>({
      query: (data) => ({
        url: '/edit-wallet',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['wallets'],
    }),

    transferBalance: builder.mutation<ServerResponseType, any>({
      query: (data) => ({
        url: '/transfer-balance',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['wallets'],
    }),

    deleteWallet: builder.mutation<ServerResponseType, any>({
      query: (_id) => ({
        url: `delete-wallet?_id=${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['wallets'],
    }),

    // categories
    getCategories: builder.query<CategoriesType, string>({
      query: (email) => `/get-categories?email=${email}`,
      providesTags: ['categories'],
    }),

    addCategory: builder.mutation<ServerResponseType, any>({
      query: (data) => ({
        url: '/add-category',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['categories'],
    }),

    // transactions
    addTransaction: builder.mutation<ServerResponseType, any>({
      query: (data) => ({
        url: '/add-transaction',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['wallets', 'categories', 'transactions'],
    }),
  }),
});

export const {
  useGetWalletsQuery,
  useGetWalletForTransactionQuery,
  useAddWalletMutation,
  useEditWalletMutation,
  useTransferBalanceMutation,
  useDeleteWalletMutation,
  useGetCategoriesQuery,
  useAddTransactionMutation,
  useAddCategoryMutation,
} = api;
