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

// const CreateClient = baseApi.injectEndpoints({
//     endpoints: (build) => {
//         clientUser: build.mutation({
//             query:
//         })
//     }
// })

export const {useLoginUserMutation} = userApi