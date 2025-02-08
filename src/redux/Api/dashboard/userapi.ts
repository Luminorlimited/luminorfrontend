import baseApi from "@/redux/Api/baseApi"


const projectApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // get all api
        getClient: build.query({
            query: () => ({
                url: '/auth/get-all-clients',
                method: 'GET',
            }),
            providesTags: ['dashboard'],
        }),
        getProfessional: build.query({
            query: () => ({
                url: '/auth/get-all-retireProfessionals',
                method: 'GET',
            }),
            providesTags: ['dashboard'],
        }),
    }),
});

export const {useGetClientQuery, useGetProfessionalQuery} = projectApi;
