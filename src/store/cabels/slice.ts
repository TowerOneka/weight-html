import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CableSlice } from './types';
import { sliceName } from './constants';
import { getCablesThunk } from './thunks';

const initialState: CableSlice = {
  data: {},
  fields: {
    category: 'default',
    subcategory: 'default',
    value: '',
  },

  status: 'init',
};

export const cableSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setCategory: (state, { payload }) => {
      state.fields.subcategory = initialState.fields.subcategory;
      state.fields.category = payload;
    },

    setField: (
      state,
      {
        payload,
      }: PayloadAction<{
        key: 'category' | 'value' | 'subcategory';
        value: string;
      }>
    ) => {
      state.fields[payload.key] = payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCablesThunk.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(getCablesThunk.fulfilled, (state, { payload }) => {
      state.status = 'success';
      state.data = payload;
    });

    builder.addCase(getCablesThunk.rejected, (state) => {
      state.status = 'error';
    });
  },
});

export const { actions: cableActions } = cableSlice;

export default cableSlice.reducer;
