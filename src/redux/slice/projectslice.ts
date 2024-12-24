// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface AuthInterFace {
//     loading: boolean;
//     error: string;
//     token: string | null;
//     selectedFilters: {
//         industry: string[];   // Define as string array since it seems to hold strings
//         timeline: string[];   // Define as string array since it seems to hold strings
//         skillType: string[];  // Define as string array since it seems to hold strings
//     };
// }

// // Initial state
// const initialState: AuthInterFace = {
//     token: null,
//     loading: false,
//     error: '',
//     selectedFilters: {
//         industry: [],
//         timeline: [],
//         skillType: [],
//     },
// };

// // Create the slice
// export const projectSlice = createSlice({
//     name: 'project',
//     initialState,
//     reducers: {
//         // Set user loading state
//         setLoading: (state, action: PayloadAction<boolean>) => {
//             state.loading = action.payload;
//         },
//         // Set error message
//         setError: (state, action: PayloadAction<string>) => {
//             state.error = action.payload;
//         },
//         // Set client filters
//         setclientFilter: (
//             state,
//             action: PayloadAction<{
//                 industry: string[];
//                 timeline: string[];
//                 skillType: string[];
//             }>
//         ) => {
//             state.selectedFilters = action.payload; // Save the selected filters
//         },
//         // Clear client filters
//         clearFilters: (state) => {
//             state.selectedFilters = {
//                 industry: [],
//                 timeline: [],
//                 skillType: [],
//             }; // Reset filters to initial empty state
//         },
//     },
// });

// // Export the actions
// export const {
//     setLoading,
//     setError,
//     setclientFilter,
//     clearFilters,  // Export the clearFilters action
// } = projectSlice.actions;

// // Export the reducer
// export default projectSlice.reducer;
