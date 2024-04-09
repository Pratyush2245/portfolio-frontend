import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeroData: builder.query({
      query: () => ({
        url: `get-layout`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    editLayout: builder.mutation({
      query: ({ categories }) => ({
        url: `edit-layout`,
        method: "PUT",
        body: {
          categories,
        },
        credentials: "include" as const,
      }),
    }),
    getCategoryData: builder.query({
      query: () => ({
        url: `get-blog-layout`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    editCategoryLayout: builder.mutation({
      query: ({ categories }) => ({
        url: `edit-blog-layout`,
        method: "PUT",
        body: {
          categories,
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetHeroDataQuery,
  useEditLayoutMutation,
  useGetCategoryDataQuery,
  useEditCategoryLayoutMutation,
} = layoutApi;
