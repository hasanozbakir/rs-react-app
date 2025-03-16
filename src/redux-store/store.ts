import { configureStore } from '@reduxjs/toolkit';
import controlledFormReducer from '../features/form/formSlice';

export const store = configureStore({
  reducer: {
    form: controlledFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
