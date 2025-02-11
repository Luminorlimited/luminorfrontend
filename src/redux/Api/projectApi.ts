import { Filters } from "@/app/(withCommonLayout)/project-list/sidebar";
import baseApi from "./baseApi";
import { LocationFilter } from "../slice/locationSlice";

const projectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all api
    clientList: build.query({
      query: () => ({
        url: "/client",
        method: "GET",
      }),
      providesTags: ["projects"],
    }),
    //filtering api
    clientFilterList: build.query({
      query: ({
        industry,
        timeline,
        skillType,
        maxBudget,
        minBudget,
        projectMax,
        projectMin,
      }: Filters) => {
        const queryParams = [];

        // Format arrays manually as strings with double quotes
        if (industry && industry.length > 0) {
          queryParams.push(
            `industry=[${industry.map((item: any) => `"${item}"`).join(",")}]`
          );
        }
        if (timeline && timeline.length > 0) {
          queryParams.push(
            `timeline=[${timeline.map((item: any) => `"${item}"`).join(",")}]`
          );
        }
        if (skillType && skillType.length > 0) {
          queryParams.push(
            `skillType=[${skillType.map((item: any) => `"${item}"`).join(",")}]`
          );
        }
        if (projectMin) {
          queryParams.push(`projectMin=${projectMin}`);
        }
        if (projectMax) {
          queryParams.push(`projectMax=${projectMax}`);
        }
        if (maxBudget) {
          queryParams.push(`maxBudget=${maxBudget}`);
        }
        if (minBudget) {
          queryParams.push(`minBudget=${minBudget}`);
        }

        const queryString = queryParams.join("&");

        return {
          url: `/client?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["projects"],
    }),
    professionalFilterList: build.query({
      query: ({
        industry,
        timeline,
        skillType,
      }: {
        industry: string[];
        timeline: string[];
        skillType: string[];
      }) => {
        const queryParams = [];

        // Format arrays manually as strings with double quotes
        if (industry && industry.length > 0) {
          queryParams.push(
            `industry=[${industry.map((item: any) => `"${item}"`).join(",")}]`
          );
        }
        if (timeline && timeline.length > 0) {
          queryParams.push(
            `timeline=[${timeline.map((item: any) => `"${item}"`).join(",")}]`
          );
        }
        if (skillType && skillType.length > 0) {
          queryParams.push(
            `skillType=[${skillType.map((item: any) => `"${item}"`).join(",")}]`
          );
        }

        const queryString = queryParams.join("&");

        return {
          url: `/retireProfessional?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["projects"],
    }),
    locationFilter: build.query({
      query: ({ lat, long, max, min }: LocationFilter) => {
        const queryParams = [];

        // Format arrays manually as strings with double quotes
        if (long && long !== undefined) {
          queryParams.push(`long=${long}`);
        }
        if (lat && lat !== undefined) {
          queryParams.push(`lat=${lat}`);
        }
        if (max && max !== undefined) {
          queryParams.push(`max=${max * 1000}`);
        }
        if (max && max !== undefined && min === undefined) {
          queryParams.push(`max=${max * 1000}&min=10000`);
        }
        if (min && min !== undefined && max === undefined) {
          queryParams.push(`min=${min * 1000}&max=10000`);
        }
        if (min && min !== undefined) {
          queryParams.push(`min=${min * 1000}`);
        }

        const queryString = queryParams.join("&");

        return {
          url:
            min !== undefined || max !== undefined
              ? `/retireProfessional/location?${queryString}`
              : "/retireProfessional",
          method: "GET",
        };
      },
      providesTags: ["projects"],
    }),

    professionalList: build.query({
      query: () => ({
        url: "/retireProfessional",
        method: "GET",
      }),
      providesTags: ["projects"], // Properly typed array of strings
    }),
  }),
});

export const {
  useClientListQuery,
  useProfessionalListQuery,
  useLazyClientFilterListQuery,
  useLazyProfessionalListQuery,
  useClientFilterListQuery,
  useProfessionalFilterListQuery,
  useLazyProfessionalFilterListQuery,
  useLazyLocationFilterQuery,
} = projectApi;
