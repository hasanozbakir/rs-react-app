import { configureStore } from '@reduxjs/toolkit';
import controlledFormReducer from '../features/controlledForm/controlledFormSlice';
import uncontrolledFormReducer from '../features/uncontrolledForm/uncontrolledFormSlice';

export const store = configureStore({
  reducer: {
    controlledForm: controlledFormReducer,
    uncontrolledForm: uncontrolledFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
