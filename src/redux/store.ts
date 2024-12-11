import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

import { adminAuth } from "./ReduxFunction"
 import baseApi from "./Api/baseApi"



const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, adminAuth)
export const store = configureStore({
    reducer: {
        Auth: persistedReducer,
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                ignorePaths: ['Auth.somePathWithNonSerializableValues']
            },
        }).concat
    }

})