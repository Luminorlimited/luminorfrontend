import baseApi from './baseApi';

const projectApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        clientList: build.query({ 
            query: () => ({
                url: '/client',
                method: 'GET',
            }),
            providesTags: ['projects'], // Properly typed array of strings
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

export  const { useClientListQuery, useProfessionalListQuery } = projectApi; 
