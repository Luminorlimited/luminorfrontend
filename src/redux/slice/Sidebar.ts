import { Filters } from "@/app/(withCommonLayout)/project-list/sidebar";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Filters = {
  industry: [],
  timeline: [],
  skillType: [],
  projectMin: 1,
  projectMax: 90,
  minBudget: 500,
  maxBudget: 10000,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setIndustry: (state, action: PayloadAction<string[]>) => {
      state.industry = action.payload;
    },
    setTimeline: (state, action: PayloadAction<string[]>) => {
      state.timeline = action.payload;
    },
    setSkillType: (state, action: PayloadAction<string[]>) => {
      state.skillType = action.payload;
    },
    setMaxRange: (state, action: PayloadAction<{ max: number }>) => {
      state.projectMax = action.payload.max;
    },
    setMinRange: (state, action: PayloadAction<{ min: number }>) => {
      state.projectMin = action.payload.min;
    },
    setMinBudget: (state, action: PayloadAction<{ min: number }>) => {
      state.minBudget = action.payload.min;
    },
    setMaxBudget: (state, action: PayloadAction<{ max: number }>) => {
      state.maxBudget = action.payload.max;
    },
    resetFilters: () => initialState, // Resets state to default values
  },
});

export const {
  setIndustry,
  setTimeline,
  setSkillType,
  setMaxRange,
  setMinRange,
  setMaxBudget,
  setMinBudget,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
