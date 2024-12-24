import baseApi from './baseApi';

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
        //filtereing api
        clientFilterList: build.query({
            query: ({ industry, timeline, skillType }) => {
                const industryQuery = industry && industry.length > 0 ? JSON.stringify(industry) : '[]';
                const timelineQuery = timeline && timeline.length > 0 ? JSON.stringify(timeline) : '[]';
                const skillTypeQuery = skillType && skillType.length > 0 ? JSON.stringify(skillType) : '[]';

                return {
                    url: `/client?industry=${industryQuery}&timeline=${timelineQuery}&skillType=${skillTypeQuery}`,
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

export const { useClientListQuery, useProfessionalListQuery, useClientFilterListQuery } = projectApi; 
