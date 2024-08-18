import { baseApi } from './baseApi';
import { TAddCategoryPayload, TServerResponse } from '@/app/_utils/types';

const category = '/category';
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
  }),
});

export const { useAddCategoryMutation } = categoryApi;
