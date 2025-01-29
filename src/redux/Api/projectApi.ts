import baseApi from "./baseApi";

const projectApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // get all api
        clientList: build.query({
            query: () => ({
                url: '/client',
                method: 'GET',
            }),
            providesTags: ['projects'],
        }),
        //filtering api
        clientFilterList: build.query({
            query: ({ industry, timeline, skillType}: { industry: string[], timeline: string[], skillType: string[] }) => {
            const queryParams = [];

            // Format arrays manually as strings with double quotes
            if (industry && industry.length > 0) {
                queryParams.push(`industry=[${industry.map((item: any) => `"${item}"`).join(',')}]`);
            }
            if (timeline && timeline.length > 0) {
                queryParams.push(`timeline=[${timeline.map((item: any) => `"${item}"`).join(',')}]`);
            }
            if (skillType && skillType.length > 0) {
                queryParams.push(`skillType=[${skillType.map((item: any) => `"${item}"`).join(',')}]`);
            }
            // if (projectMin) {
            //     queryParams.push(`projectMin=${projectMin}`);
            // }
            // if (projectMax) {
            //     queryParams.push(`projectMax=${projectMax}`);
            // }

            const queryString = queryParams.join('&');

            return {
                url: `/client?${queryString}`,
                method: 'GET',
            };
            },
            providesTags: ['projects'],
        }),
        professionalFilterList: build.query({
            query: ({ industry, timeline, skillType }: { industry: string[], timeline: string[], skillType: string[] }) => {
                const queryParams = [];

                // Format arrays manually as strings with double quotes
                if (industry && industry.length > 0) {
                    queryParams.push(`industry=[${industry.map((item: any) => `"${item}"`).join(',')}]`);
                }
                if (timeline && timeline.length > 0) {
                    queryParams.push(`timeline=[${timeline.map((item: any) => `"${item}"`).join(',')}]`);
                }
                if (skillType && skillType.length > 0) {
                    queryParams.push(`skillType=[${skillType.map((item: any) => `"${item}"`).join(',')}]`);
                }

                const queryString = queryParams.join('&');

                return {
                    url: `/retireProfessional?${queryString}`,
                    method: 'GET',
                };
            },
            providesTags: ['projects'],
        }),

        professionalList: build.query({
            query: () => ({

                url: '/retireProfessional',
                method: 'GET',
            }),
            providesTags: ['projects'], // Properly typed array of strings
        }),
    }),
});

export const { useClientListQuery, useProfessionalListQuery, useLazyClientFilterListQuery, useLazyProfessionalListQuery, useClientFilterListQuery, useProfessionalFilterListQuery } = projectApi; 
