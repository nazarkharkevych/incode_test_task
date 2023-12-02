import { configureStore } from '@reduxjs/toolkit';
// import { apiSlice } from '../features/api/apiSlice';
import charactersReducer from '../features/characters/charactersSlice';

export const store = configureStore({
  reducer: {
    store: charactersReducer,
    // [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
