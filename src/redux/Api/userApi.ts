import { ClientData, IProfessional } from "@/utils/Interfaces";
import baseApi from "./baseApi";


const userApi = baseApi.injectEndpoints({
    overrideExisting: true,  // Allow overriding existing endpoints
    endpoints: (build) => ({
        loginUser: build.mutation({
            query: (data: any) => {
                console.log(data)
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
                console.log(data)
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
                console.log(data)
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
                console.log(data)
                return {
                    url: '/retireProfessional/signUp',
                    method: 'POST',
                    body: data,
                }
            },
            invalidatesTags: ['User']
        }), 
        editclientprofile: build.mutation({
            query: ({id, data}) => {
                console.log(id)
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
            }
        }),
        getProfile: build.query({
            query: () => {
                return {
                    url: `/auth/get-profile`,
                    method: 'GET',
                }
            }
        }),
        getProfileById: build.query({
            query: ({id}) => {
                return {
                    url: `/client/${id}`,
                    method: 'GET',

                }
            }
        }),
        
      


    })
})



export const { useLoginUserMutation, useClientUserMutation, useProfessionalUserMutation, useVerifyUserMutation, useEditclientprofileMutation , useEditprofessionalprofileMutation, useGetProfileQuery, useGetProfileByIdQuery} = userApi