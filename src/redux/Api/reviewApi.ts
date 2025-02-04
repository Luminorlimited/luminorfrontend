import baseApi from "./baseApi";


const reviewApi = baseApi.injectEndpoints({
    overrideExisting: true,  // Allow overriding existing endpoints
    endpoints: (build) => ({

        clientReview: build.mutation({
            query: ({id, data}) => {
                return {
                    url: `/review/clientReview/${id}`,
                    method: 'PATCH',
                    body: data,
                  
                }
            },
            invalidatesTags: ['Review']
        }),
        professionalAddReview: build.mutation({
            query: ({id, data}) => {
                return {
                    url: `/review/professionalReview/${id}`,
                    method: 'PATCH',
                    body: data
                 
                }
            },
            invalidatesTags: ['Review']
        }),
       
        
      


    })
})



export const {useProfessionalAddReviewMutation, useClientReviewMutation } = reviewApi