import baseApi from "@/redux/api/baseApi";


const offerApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        loginUser: build.mutation({
            query: ({id, data}) => {
                console.log(data)
                return {
                    url: `/offer/professional/${id}`,
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['Offer']
        }),

    })
})



export const { useLoginUserMutation } = offerApi