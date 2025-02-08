import baseApi from "@/redux/Api/baseApi"


const orderapi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // get all api
        getOrders: build.query({
            query: () => ({
                url: '/order/get-all-orders',
                method: 'GET',
            }),
            providesTags: ['orders'],
        }),
        getTransaction: build.query({
            query: () => ({
                url: '/transaction/get-all-trasaction',
                method: 'GET',
            }),
            providesTags: ['orders'],
        }),

        lastTransaction: build.query({
            query: () => ({
                url: '/transaction/last-transaction',
                method: 'GET',
            }),
            providesTags: ['orders'],
        }),

        totalReveneue: build.query({
            query: () => ({
                url: '/transaction/total-revenue',
                method: 'GET',
            }),
            providesTags: ['orders'],
        }),
        totalRefund: build.query({
            query: () => ({
                url: '/transaction/total-refunded',
                method: 'GET',
            }),
            providesTags: ['orders'],
        }),
     
       
    }),
});

export const {useGetOrdersQuery, useGetTransactionQuery, useLastTransactionQuery, useTotalReveneueQuery, useTotalRefundQuery} = orderapi;
