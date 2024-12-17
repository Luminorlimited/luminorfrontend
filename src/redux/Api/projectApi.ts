import baseApi from './baseApi';

const projectApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        projectList: build.query({ 
            query: () => ({
                url: '/client',
                method: 'GET',
            }),
            providesTags: ['projects'], // Properly typed array of strings
        }),
    }),
});

export  const { useProjectListQuery } = projectApi; 
