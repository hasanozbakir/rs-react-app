import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../../utils/types';
import { initialState } from '../../utils/constants';

const controlledFormSlice = createSlice({
  name: 'controlledForm',
  initialState,
  reducers: {
    setControlledFormData: (_state, action: PayloadAction<FormData>) => {
      return action.payload;
    },
    resetControlledForm: () => initialState,
  },
});

export const { setControlledFormData, resetControlledForm } =
  controlledFormSlice.actions;
export default controlledFormSlice.reducer;
