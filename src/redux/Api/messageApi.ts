// import baseApi from './baseApi';

import baseApi from "./baseApi";

const projectApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // get all api
        sendMessage: build.mutation({
            query: (messageData) => ({
                url: '/messages',
                method: 'POST',
                body: messageData
            }),
            invalidatesTags: ['message'],
        }),
        getMessage: build.query({
            query: ({user1, user2}) => ({
                url: `/messages?user1=${user1}&user2=${user2}`,
                method: 'GET'
            }),
            providesTags: ['message'],
        }),

    }),
});

export const { useGetMessageQuery, useSendMessageMutation} = projectApi;
