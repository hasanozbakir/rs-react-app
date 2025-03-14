import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormValues } from '../../utils/types';
import { initialState } from '../../utils/constants';

const controlledFormSlice = createSlice({
  name: 'controlledForm',
  initialState,
  reducers: {
    setControlledFormData: (state, action: PayloadAction<FormValues>) => {
      state.lastAddedId = Date.now();
      state.data.push({ ...action.payload, id: state.lastAddedId });
    },
    resetControlledForm: () => initialState,
  },
});

export const { setControlledFormData, resetControlledForm } =
  controlledFormSlice.actions;
export default controlledFormSlice.reducer;
