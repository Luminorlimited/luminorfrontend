import baseApi from "./baseApi";
import { ClientData, IProfessional } from "@/utils/Interfaces";


const userApi = baseApi.injectEndpoints({
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
            }
        })
    })
})



export const { useLoginUserMutation, useClientUserMutation, useProfessionalUserMutation } = userApi