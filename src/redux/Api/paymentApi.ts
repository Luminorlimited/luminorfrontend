import baseApi from "@/redux/api/baseApi";


const paymentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        offerpayment: build.query({
            query: ({userId, data}) => {
                console.log(userId)
                return {
                    url: `/stripe/create-payment`,
                    method: 'POST',
                    body: data
                }
            },
            providesTags: ['Payment']
        }),
      

    })
})



export const { useOfferpaymentQuery } = paymentApi


