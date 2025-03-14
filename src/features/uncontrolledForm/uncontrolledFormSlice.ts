import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormValues } from '../../utils/types';
import { initialState } from '../../utils/constants';

const uncontrolledFormSlice = createSlice({
  name: 'uncontrolledForm',
  initialState,
  reducers: {
    setUncontrolledFormData: (state, action: PayloadAction<FormValues>) => {
      state.lastAddedId = Date.now();
      state.data.push({ ...action.payload, id: state.lastAddedId });
    },
    resetUncontrolledForm: () => initialState,
  },
});

export const { setUncontrolledFormData, resetUncontrolledForm } =
  uncontrolledFormSlice.actions;
export default uncontrolledFormSlice.reducer;
