import {IProfessional, UserInterface, ClientData, messageUser} from '@/utils/Interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface AuthInterFace {
    user: UserInterface | null;
    client: ClientData | null;
    professional: IProfessional | null;
    loading: boolean;
    error: string;
    token: string | null;
    messageuser: messageUser | null;
    selectedFilters: {
        industry: [],
        timeline: [],
        skillType: [],
        // projectMin: '',
        // projectMax: '',
    },
}

// Initial state
const initialState: AuthInterFace = {
    user: null,
    client: null,
    professional: null,
    token: null,
    loading: false,
    error: '',
    messageuser: null,

    selectedFilters: {
        industry: [],
        timeline: [],
        skillType: [],
        // projectMin: "",
        // projectMax: "",
    },
};


// Create the slice
export const adminAuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        // Set user and token
        setUser: (state, action: PayloadAction<{ user: UserInterface; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = '';
        },
        // Log out the user
        logOut: (state) => {
            state.user = null;
            state.token = null;
            state.client = null;
            state.professional = null;
            state.error = '';
        },
        // Set loading state
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        // Set an error message
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setclientFilter: (state, action) => {
            state.selectedFilters = action.payload; // Save the selected filters
        },
        setMessageUser: (state, action) => {
            state.messageuser = action.payload.messageuser
        }
    },
});

// Export the actions
export const {
    setUser,
    logOut,
    setLoading,
    setError,
    setMessageUser,
    setclientFilter
} = adminAuthSlice.actions;

// Export the reducer
export default adminAuthSlice.reducer;
