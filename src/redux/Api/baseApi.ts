import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
         baseUrl: 'http://192.168.11.110:5004/api/v1',
    }),
    endpoints: () => ({}),
    tagTypes: ["approveEvent", "allEvents", "login"]
})

export default baseApi