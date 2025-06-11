

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, Persistor } from "redux-persist";
import storage from "./storage"
import { reducers } from "./Reducers/reducers";
import { rtkApi } from "@/services/rtk.api.service";
import { combineReducers } from "redux";


// Combine reducers first
const rootReducer = combineReducers({
  reducers, // Assuming reducers is an object containing all your slice reducers
  [rtkApi.reducerPath]: rtkApi.reducer,
});

// Create the persist config
const persistConfig = {
  key: "root",
  storage,
};

// Apply persistReducer to the combined rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(rtkApi.middleware),
});

// Create the persistor
export const persistor: Persistor = persistStore(store);

// Define the RootState type
export type RootState = ReturnType<typeof rootReducer>;

// Export the persistedReducer state type
export type PersistedReducerState = ReturnType<typeof persistedReducer>;
