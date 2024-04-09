import { apiSlice } from "../api/apiSlice";

export const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (data) => ({
        url: "create-blog",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    editBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-blog/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllBlogs: builder.query({
      query: () => ({
        url: "get-blogs",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (blogId) => ({
        url: `delete-blog/${blogId}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    addReviewInBlog: builder.mutation({
      query: ({ blogId, review, rating }) => ({
        url: `add-blog-review/${blogId}`,
        method: "PUT",
        body: {
          review,
          rating,
        },
        credentials: "include" as const,
      }),
    }),
    addReplyInReviewBlog: builder.mutation({
      query: ({ comment, blogId, reviewId }) => ({
        url: "add-blog-reply",
        method: "PUT",
        body: {
          comment,
          blogId,
          reviewId,
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useEditBlogMutation,
  useAddReplyInReviewBlogMutation,
  useAddReviewInBlogMutation,
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
} = blogApi;
