// src/features/api/baseApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { store } from "@/redux/store";

export const baseApi = createApi({
    reducerPath: 'baseApi', // The key for this API in the Redux store
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5001/api/v1",
        prepareHeaders: (headers) => {
            const token = store.getState().Auth.token;
            if (token) {
                headers.set('Authorization', `${token}`);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
    tagTypes: ["User", "projects", "message", "Offer", "Payment"]
});

// Export hooks for usage in functional components
export default baseApi;
