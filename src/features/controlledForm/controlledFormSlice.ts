import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormValues } from '../../utils/types';

export interface FormEntry extends FormValues {
  id: number;
}

interface FormState {
  data: FormEntry[];
  lastAddedId: number | null;
}

const initialState: FormState = {
  data: [],
  lastAddedId: null,
};

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
