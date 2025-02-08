import baseApi from "@/redux/Api/baseApi"


const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // get all api
     



        totalUser: build.query({
            query: () => ({
                url: '/auth/get-all-users',
                method: 'GET',
            }),
            providesTags: ['dashboard'],
        }),
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
        getSingleUser: build.query({
            query: (id) => ({
                url: `/auth/get-single-user/${id}`,
                method: 'GET',
            }),
            providesTags: ['dashboard'],
        }),
        getTotalOffer: build.query({
            query: () => ({
                url: `/offer/get-all-offers`,
                method: 'GET',
            }),
            providesTags: ['dashboard'],
        }),
       
       
    }),
});

export const {useGetClientQuery, useGetProfessionalQuery, useGetSingleUserQuery, useTotalUserQuery, useGetTotalOfferQuery} = userApi;
