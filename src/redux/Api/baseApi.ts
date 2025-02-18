// src/features/api/baseApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { store } from "@/redux/store";

const public_url = process.env.NEXT_PUBLIC_BACKEND_VERCEL_URL

console.log("public url", public_url)

export const baseApi = createApi({
    reducerPath: 'baseApi', // The key for this API in the Redux store
    baseQuery: fetchBaseQuery({
        baseUrl: public_url,
        prepareHeaders: (headers) => {
            const token = store.getState().Auth.token;
            if (token) {
                headers.set('Authorization', `${token}`);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
    tagTypes: ["User", "projects", "message", "Offer", "Payment", "Review", "dashboard", "orders"]
});

// Export hooks for usage in functional components
export default baseApi;
