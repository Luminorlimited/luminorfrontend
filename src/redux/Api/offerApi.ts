import baseApi from "./baseApi"


const offerApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
      
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
        deleteOffer: build.mutation({
            query: (offerId) => {
                console.log(offerId)
                return {
                    url: `/offer/delete/${offerId}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['Offer']
        }),

    })
})



export const { useGetOfferQuery, useGetSingleOfferQuery, useDeleteOfferMutation } = offerApi