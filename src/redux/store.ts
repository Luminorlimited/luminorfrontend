import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import adminAuth from './ReduxFunction'; // Assuming your auth slice is here
import baseApi from './Api/baseApi';


// Persist configuration for Auth
const authPersistConfig = {
    key: 'auth',
    storage,
};

// Persisted reducers for Auth
const persistedAuthReducer = persistReducer(authPersistConfig, adminAuth);

// Configure the store without persisting project
export const store = configureStore({
    reducer: {
        Auth: persistedAuthReducer,
        // project: projectSlice.reducer, // No persistence for project
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                ignoredPaths: ['Auth.somePathWithNonSerializableValues'],
            },
        }).concat(baseApi.middleware),
});

// Persistor configuration
export const persistor = persistStore(store);

// Type definitions for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
