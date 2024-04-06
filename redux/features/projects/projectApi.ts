import { apiSlice } from "../api/apiSlice";

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (data) => ({
        url: "create-project",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    editProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-project/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllProjectsLogin: builder.query({
      query: () => ({
        url: "get-all-projects",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getAllProjects: builder.query({
      query: () => ({
        url: "get-projects",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteProject: builder.mutation({
      query: (projectId) => ({
        url: `delete-project/${projectId}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    addReviewInProject: builder.mutation({
      query: ({ projectId, review, rating }) => ({
        url: `add-review/${projectId}`,
        method: "PUT",
        body: {
          review,
          rating,
        },
        credentials: "include" as const,
      }),
    }),
    addReplyInReview: builder.mutation({
      query: ({ comment, projectId, reviewId }) => ({
        url: "add-reply",
        method: "PUT",
        body: {
          comment,
          projectId,
          reviewId,
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useEditProjectMutation,
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
  useGetAllProjectsLoginQuery,
  useAddReviewInProjectMutation,
  useAddReplyInReviewMutation,
} = projectApi;
