import { apiSlice } from "../api/apiSlice";

export const blogRequestApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBlogRequest: builder.mutation({
      query: (data) => ({
        url: "create-blog-request",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllBlogRequests: builder.query({
      query: () => ({
        url: "get-all-blog-requests",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteBlogRequest: builder.mutation({
      query: (blogRequestId) => ({
        url: `delete-blog-request/${blogRequestId}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateBlogRequestMutation,
  useGetAllBlogRequestsQuery,
  useDeleteBlogRequestMutation,
} = blogRequestApi;
