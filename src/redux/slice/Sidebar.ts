// import { Filters } from "@/app/(withCommonLayout)/project-list/sidebar";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const initialState: Filters = {
//   industry: [],
//   timeline: [],
//   skillType: [],
//   projectMin: 1,
//   projectMax: 90,
//   minBudget: 500,
//   maxBudget: 10000,
// };

// const filtersSlice = createSlice({
//   name: "filters",
//   initialState,
//   reducers: {
//     setIndustry: (state, action: PayloadAction<string[]>) => {
//       state.industry = action.payload;
//     },
//     setTimeline: (state, action: PayloadAction<string[]>) => {
//       state.timeline = action.payload;
//     },
//     setSkillType: (state, action: PayloadAction<string[]>) => {
//       state.skillType = action.payload;
//     },
//     setProjectRange: (
//       state,
//       action: PayloadAction<{ min: number; max: number }>
//     ) => {
//       state.projectMin = action.payload.min;
//       state.projectMax = action.payload.max;
//     },
//     setBudgetRange: (
//       state,
//       action: PayloadAction<{ min: number; max: number }>
//     ) => {
//       state.minBudget = action.payload.min;
//       state.maxBudget = action.payload.max;
//     },
//     resetFilters: () => initialState, // Resets state to default values
//   },
// });

// export const {
//   setIndustry,
//   setTimeline,
//   setSkillType,
//   setProjectRange,
//   setBudgetRange,
//   resetFilters,
// } = filtersSlice.actions;

// export default filtersSlice.reducer;
