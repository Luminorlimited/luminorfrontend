// import build from "next/dist/build";
import baseApi from "./baseApi";



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
            invalidatesTags: ['logIn']
        })
    })
})

export const {useLoginUserMutation} = userApi