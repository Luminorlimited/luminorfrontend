import baseApi from "@/redux/Api/baseApi"


const orderapi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // get all api
        orderInsight: build.query({
            query: ({ timeframe }: { timeframe: string }) => {
                const queryParams = `timeframe=${timeframe}`;
                return {
                    url: `/order/get-order-calculation/?${queryParams}`,
                    method: 'GET',
                };
            },
            providesTags: ['orders'],
        }),
        yearlyTransaction: build.query({
            query: () => {
                return {
                    url: `/transaction/get-transaction-calculation`,
                    method: 'GET',
                };
            },
            providesTags: ['orders'],
        }),

        totalOrder: build.query({
            query: () => ({
                url: '/order/get-all-orders',
                method: 'GET',
            }),
            providesTags: ['orders'],
        }),
        totalTransaction: build.query({
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

export const {useTotalOrderQuery, useTotalTransactionQuery, useLastTransactionQuery, useTotalReveneueQuery, useTotalRefundQuery, useOrderInsightQuery, useYearlyTransactionQuery} = orderapi;
