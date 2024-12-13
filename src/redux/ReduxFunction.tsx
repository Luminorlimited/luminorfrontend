import { UserInterface } from '@/utils/Interfaces'
import { createSlice } from '@reduxjs/toolkit'

interface AuthInterFace {
    user: UserInterface | null;
    loading?: boolean;
    error?: string;
    token: string | null;
}

const initialState: AuthInterFace = {
    user: null,
    token: null
}


export const adminAuth = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload

        },
        logOut: (state) => {
            state.user = null
            state.token = null

        }

    },
})

export const { setUser, logOut } = adminAuth.actions


export default adminAuth.reducer