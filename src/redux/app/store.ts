import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from '@/redux/features/characters/charactersSlice';

export const store = configureStore({
  reducer: {
    store: charactersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
