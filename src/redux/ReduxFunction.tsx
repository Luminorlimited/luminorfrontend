import { IProfessional, UserInterface, ClientData } from '@/utils/Interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the interface for the state
interface AuthInterFace {
    user: UserInterface | null;
    client: ClientData | null;
    professional: IProfessional | null;
    loading: boolean;
    error: string;
    token: string | null;
}

// Initial state
const initialState: AuthInterFace = {
    user: null,
    client: null,
    professional: null,
    token: null,
    loading: false,
    error: '',
};

// Create the slice
export const adminAuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        setUser: ( state,  action: PayloadAction<{ user: UserInterface; token: string }> ) => {
            state.user = action.payload.user; // Set the user data
            state.token = action.payload.token; // Set the token
            state.error = '';
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            state.client = null;
            state.professional = null;
            state.error = '';
        },
       
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        // Set an error message
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

// Export the actions
export const {
    setUser,
    logOut,
    // createClient,
    setLoading,
    setError,
    // createProfessional,
} = adminAuthSlice.actions;

// Export the reducer
export default adminAuthSlice.reducer;
