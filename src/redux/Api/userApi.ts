import { ClientData, IProfessional } from "@/utils/Interfaces";
import baseApi from "./baseApi";


const userApi = baseApi.injectEndpoints({
    overrideExisting: true,  // Allow overriding existing endpoints
    endpoints: (build) => ({
        updateCoverPhoto: build.mutation({
            query: (formData: any) => {
                // console.log(formData)
                return {
                    url: '/auth/update-cover-photo',
                    method: 'PATCH',
                    body: formData
                }
            },
            invalidatesTags: ['User']
        }),
        loginUser: build.mutation({
            query: (data: any) => {
                // console.log(data)
                return {
                    url: '/auth/signIn',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['User']
        }),
        forgetPass: build.mutation({
            query: (data: any) => {
                // console.log(data)
                return {
                    url: '/auth/forget-password',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['User']
        }),
        verifyOtp: build.mutation({
            query: (data: any) => {
                // console.log(data)
                return {
                    url: '/auth/forget-password-verify',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['User']
        }),
        resetPass: build.mutation({
            query: (data: any) => {
                // console.log(data)
                return {
                    url: '/auth/reset-password',
                    method: 'PATCH',
                    body: data
                }
            },
            invalidatesTags: ['User']
        }),
        generateUrl: build.mutation({
            query: () => {
                return {
                    url: '/stripe/generate-onboarding-url',
                    method: 'POST',
                }
            },
            invalidatesTags: ['User']
        }),

        adminloginUser: build.mutation({
            query: (data: any) => {
                // // console.log(data)
                return {
                    url: '/auth/signIn',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['User']
        }),
        verifyUser: build.mutation({
            query: (data: any) => {
                // console.log(data)
                return {
                    url: '/auth/otp-enter',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['User']
        }),

        clientUser: build.mutation<ClientData, any>({
            query: (data) => {
                // console.log(data)
                return {
                    url: '/client/signUp',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['User']
        }),

        professionalUser: build.mutation<IProfessional, any>({
            query: (data) => {
                // console.log(data)
                return {
                    url: '/retireProfessional/signUp',
                    method: 'POST',
                    body: data,
                }
            },
            invalidatesTags: ['User']
        }),
        editclientprofile: build.mutation({
            query: ({ id, data }) => {
                // console.log(id)
                return {
                    url: `/client/profile/${id}`,
                    method: 'PATCH',
                    body: data
                }
            },
            invalidatesTags: ['User']
        }),
        editprofessionalprofile: build.mutation({
            query: ({ id, data }) => {
                return {
                    url: `/retireProfessional/profile/${id}`,
                    method: 'PATCH',
                    body: data
                }
            },
            invalidatesTags: ['User']
        }),
        getProfile: build.query({
            query: () => {
                return {
                    url: `/auth/get-profile`,
                    method: 'GET',
                }
            },
            providesTags: ['User']
        }),
        getProfileById: build.query({
            query: ({ id }) => {
                return {
                    url: `/client/${id}`,
                    method: 'GET',

                }
            }
        }),




    })
})



export const { useLoginUserMutation, useClientUserMutation, useProfessionalUserMutation, useVerifyUserMutation, useEditclientprofileMutation, useEditprofessionalprofileMutation, useGetProfileQuery, useGetProfileByIdQuery, useUpdateCoverPhotoMutation, useAdminloginUserMutation, useGenerateUrlMutation, useForgetPassMutation, useVerifyOtpMutation, useResetPassMutation } = userApi