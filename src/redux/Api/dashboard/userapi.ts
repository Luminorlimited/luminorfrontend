import baseApi from "@/redux/Api/baseApi"


const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // get all api
     



        updateAdmin: build.mutation({
            query: (data) => ({
                url: `/auth/update-admin`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['dashboard'],
        }),
        getAdminProfile: build.query({
            query: () => ({
                url: `/auth/get-profile`,
                method: "GET"
            }),
            providesTags: ['dashboard']
        }),

        updateProfileImg: build.mutation({
            query: (data) => ({
                url: `/auth/update-admin-profile-image`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['dashboard'],
        }),
        deleteUser: build.mutation({
            query: (id) => ({
                url: `/auth/delete-user/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['dashboard'],
        }),

        
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

export const {useGetClientQuery, useGetProfessionalQuery, useGetSingleUserQuery, useTotalUserQuery, useGetTotalOfferQuery, useDeleteUserMutation, useUpdateAdminMutation, useUpdateProfileImgMutation , useGetAdminProfileQuery} = userApi;
