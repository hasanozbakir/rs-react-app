import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../../utils/types';
import { initialState } from '../../utils/constants';

const uncontrolledFormSlice = createSlice({
  name: 'uncontrolledForm',
  initialState,
  reducers: {
    setUncontrolledFormData: (_state, action: PayloadAction<FormData>) => {
      return action.payload;
    },
    resetUncontrolledForm: () => initialState,
  },
});

export const { setUncontrolledFormData, resetUncontrolledForm } =
  uncontrolledFormSlice.actions;
export default uncontrolledFormSlice.reducer;
