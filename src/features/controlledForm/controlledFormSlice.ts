import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormValues } from '../../utils/types';
import { initialState } from '../../utils/constants';

const controlledFormSlice = createSlice({
  name: 'controlledForm',
  initialState,
  reducers: {
    setControlledFormData: (state, action: PayloadAction<FormValues>) => {
      return { ...state, ...action.payload };
    },
    resetControlledForm: () => initialState,
  },
});

export const { setControlledFormData, resetControlledForm } =
  controlledFormSlice.actions;
export default controlledFormSlice.reducer;
