import { Filters } from "@/app/(withCommonLayout)/project-list/sidebar";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Filters = {
  industry: undefined,
  timeline: undefined,
  skillType: undefined,
  projectMin: undefined,
  projectMax: undefined,
  minBudget: undefined,
  maxBudget: undefined,
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
