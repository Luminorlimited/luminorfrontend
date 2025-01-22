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
        ProfessionalOrder: build.query({
            query: () => {
                return {
                    url: `/order/professional-order`,
                    method: 'GET',
                }
            },
            providesTags: ['Payment']
        }),
        getSingleOrder: build.query({
            query: (id) => {
                return {
                    url: `/order/${id}`,
                    method: 'GET',
                }
            },
            providesTags: ['Payment']
        }),

        deliverOrder: build.mutation({
            query: ({id, data}) => {
                return {
                    url: `/stripe/deliver-project/${id}`,
                    method: 'PATCH',
                    body: data,
                }
            },
            invalidatesTags: ['Payment']
        })





    })
})



export const { useOfferpaymentMutation, useTransactionListQuery, useProfessionalOrderQuery, useGetSingleOrderQuery, useDeliverOrderMutation} = paymentApi


