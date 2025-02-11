import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LocationFilter {
  lat: number | undefined;
  long: number | undefined;
  max: number | undefined;
  min: number | undefined;
}

const initialState: LocationFilter = {
  lat: undefined,
  long: undefined,
  max: undefined,
  min: undefined,
};

const locationFilter = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<LocationFilter>) => {
      state.lat = action.payload.lat;
      state.long = action.payload.long;
      state.max = action.payload.max;
      state.min = action.payload.min;
    },
    resetFilters: () => initialState, // Resets state to default values
  },
});

export const { resetFilters, setLocation} = locationFilter.actions;

export default locationFilter.reducer;
