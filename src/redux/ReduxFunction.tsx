import { ClientData, IProfessional, UserInterface } from '@/utils/Interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthInterFace {
    user: UserInterface | null;
    client: ClientData | null;
    professional: IProfessional | null;
    loading: boolean;
    error: string;
    token: string | null;
}

const initialState: AuthInterFace = {
    user: null,
    client: null,
    professional: null,
    token: null,
    loading: false,
    error: '',
};

export const adminAuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserInterface>) => {
            state.user = action.payload;
            state.error = ''; // Clear any errors when user is set
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            state.client = null; // Reset client on logout
            state.error = '';
        },
        createClient: (state, action: PayloadAction<ClientData>) => {
            state.client = action.payload;
            state.error = ''; // Clear any errors when client is created
        },
        createProfessional: (state, action: PayloadAction<IProfessional>) => {
            state.professional = action.payload;
            state.error = ''; // Clear any errors when client is created
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const { setUser, logOut, createClient, setLoading, setError, createProfessional } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
