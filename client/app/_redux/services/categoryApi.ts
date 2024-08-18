import {
  TCategory,
  TServerResponse,
  TAddCategoryPayload,
} from '@/app/_utils/types';
import { makeSearchQuery } from '@/app/_utils/helpers/query.helper';
import { baseApi } from './baseApi';

const category = '/category';
const categories = '/categories';

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // add category
    addCategory: builder.mutation<TServerResponse<null>, TAddCategoryPayload>({
      query: (payload) => ({
        url: `${category}`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['categories'],
    }),

    // get categories
    getCategories: builder.query<
      TServerResponse<TCategory[]>,
      Record<string, any>
    >({
      query: (args) => `${categories}${makeSearchQuery(args)}`,
    }),
  }),
});

export const { useAddCategoryMutation, useGetCategoriesQuery } = categoryApi;
