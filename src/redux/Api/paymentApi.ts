import baseApi from "@/redux/api/baseApi";


const paymentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        offerpayment: build.mutation({
            query: (data) => {
                // console.log(userId)
                return {
                    url: `/stripe/create-payment-intent`,
                    method: 'POST',
                    body: data,

                }
            },
            invalidatesTags: ['Payment']
        }),
        transactionList: build.query({
            query: () => {
                // console.log(userId)
                return {
                    url: `/order/client-order`,
                    method: 'GET',
                }
            },
            providesTags: ['Payment']
        }),
        OrderList: build.query({
            query: () => {
                // console.log(userId)
                return {
                    url: `/order/client-order`,
                    method: 'GET',
                }
            },
            providesTags: ['Payment']
        }),


    })
})



export const { useOfferpaymentMutation, useTransactionListQuery } = paymentApi


