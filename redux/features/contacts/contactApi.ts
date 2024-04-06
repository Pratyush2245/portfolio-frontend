import { apiSlice } from "../api/apiSlice";

export const contactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation({
      query: (data) => ({
        url: "create-contact",
        method: "POST",
        body: data,
      }),
    }),
    getAllContacts: builder.query({
      query: () => ({
        url: "get-contacts",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useCreateContactMutation, useGetAllContactsQuery } = contactApi;
