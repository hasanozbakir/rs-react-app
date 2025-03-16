import { nanoid } from 'nanoid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormValues } from '../../utils/types';
import { initialState } from '../../utils/constants';

const formSlice = createSlice({
  name: 'controlledForm',
  initialState,
  reducers: {
    addFormData: (
      state,
      action: PayloadAction<{ formData: FormValues; type: 'form' | 'ref' }>
    ) => {
      const id = nanoid();
      state.lastAddedId = id;
      state.data[action.payload.type].push({ ...action.payload.formData, id });
    },
    resetForm: () => initialState,
  },
  // name: 'controlledForm',
  // initialState,
  // reducers: {
  //   addFormData: (state, action: PayloadAction<FormValues>) => {
  //     state.lastAddedId = nanoid();
  //     state.data.push({ ...action.payload, id: state.lastAddedId });
  //   },
  //   resetForm: () => initialState,
  // },
});

export const { addFormData, resetForm } = formSlice.actions;
export default formSlice.reducer;
