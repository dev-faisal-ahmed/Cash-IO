import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ServerResponseType,
  WalletForTransactionType,
} from '@/lib/server-types';
import {
  CategoriesType,
  MonthlyTransactionType,
  TransactionType,
  TransactionsTypeSeverData,
  TransferType,
  WalletType,
} from '@/lib/data-types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api`,
  }),
  tagTypes: ['wallets', 'categories', 'transactions', 'transfers'],

  endpoints: (builder) => ({
    // wallets
    getWallets: builder.query<WalletType[], string>({
      query: (email) => `get-wallets?email=${email}`,
      providesTags: ['wallets'],
    }),

    addWallet: builder.mutation<ServerResponseType, any>({
      query: (data) => ({
        url: 'add-wallet',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['wallets'],
    }),

    getWalletForTransaction: builder.query<WalletForTransactionType, string>({
      query: (email) => `get-wallets/for-transaction?email=${email}`,
      providesTags: ['wallets'],
    }),

    editWallet: builder.mutation<ServerResponseType, any>({
      query: (data) => ({
        url: 'edit-wallet',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['wallets'],
    }),

    transferBalance: builder.mutation<ServerResponseType, any>({
      query: (data) => ({
        url: 'transfer-balance',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['wallets', 'transfers'],
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
      query: (email) => `get-categories?email=${email}`,
      providesTags: ['categories'],
    }),

    addCategory: builder.mutation<ServerResponseType, any>({
      query: (data) => ({
        url: 'add-category',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['categories'],
    }),

    // transactions
    addTransaction: builder.mutation<ServerResponseType, any>({
      query: (data) => ({
        url: 'add-transaction',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['wallets', 'categories', 'transactions'],
    }),

    getAllTransactions: builder.query<TransactionType[], string>({
      query: (email) => `get-transactions/all?email=${email}`,
      providesTags: ['transactions'],
    }),

    getTransactions: builder.query<TransactionsTypeSeverData, string>({
      query: (email) => `get-transactions?email=${email}`,
      providesTags: ['transactions'],
    }),

    getMonthlyTransactions: builder.query<MonthlyTransactionType, string>({
      query: (email) => `get-monthly-transactions?email=${email}`,
      providesTags: ['transactions'],
    }),

    // transfers
    getTransfers: builder.query<TransferType[], string>({
      query: (email) => `get-transfers?email=${email}`,
      providesTags: ['transfers'],
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
  useGetTransactionsQuery,
  useGetAllTransactionsQuery,
  useGetMonthlyTransactionsQuery,
  useGetTransfersQuery,
} = api;
