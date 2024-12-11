import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
    name: string,
    role: string,
}


const initialState: CounterState = {
    name: "",
    role: ""
}

export const adminAuth = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name
        }
    }
})

export const { setUser } = adminAuth.actions

export default adminAuth.reducer