import baseApi from "@/redux/api/baseApi";


const offerApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // loginUser: build.mutation({
        //     query: ({id, data}) => {
        //         console.log(data)
        //         return {
        //             url: `/offer/professional/${id}`,
        //             method: 'POST',
        //             body: data
        //         }
        //     },
        //     invalidatesTags: ['Offer']
        // }),
        getOffer: build.query({
            query: (userId) => {
                console.log(userId)
                return {
                    url: `/offer/professional/${userId}`,
                    method: 'GET',
                }
            },
            providesTags: ['Offer']
        }),
        getSingleOffer: build.query({
            query: (offerId) => {
                console.log(offerId)
                return {
                    url: `/offer/${offerId}`,
                    method: 'GET',
                }
            },
            providesTags: ['Offer']
        }),

    })
})



export const { useGetOfferQuery, useGetSingleOfferQuery } = offerApi