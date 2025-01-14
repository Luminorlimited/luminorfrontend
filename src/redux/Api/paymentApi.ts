import baseApi from "@/redux/api/baseApi";


const paymentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        offerpayment: build.query({
            query: (userId) => {
                console.log(userId)
                return {
                    url: `/stripe/create-payment`,
                    method: 'POST',
                }
            },
            providesTags: ['Payment']
        }),
      

    })
})



export const { useOfferpaymentQuery } = paymentApi


