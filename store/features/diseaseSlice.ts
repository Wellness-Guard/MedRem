import {createSlice} from '@reduxjs/toolkit';
import {fetchDisease} from '../thunkActions/diseaseAction';
const initialState = {
  selectedDisease: '',
  diseases: [],
};

const diseaseSlice = createSlice({
  name: 'disease',
  initialState: {
    ...initialState,
    loading: false,
    error: '',
    success: '',
  },
  reducers: {
    updateDisease: (state, {payload}) => {
      state.error = '';
      state.selectedDisease = payload;
      console.log('Selected Disease', state.selectedDisease);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchDisease.fulfilled, (state, {payload}) => {
      state.error = '';
      state.diseases = [...payload.data] as [];
    });
    builder.addCase(fetchDisease.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload as string;
    });
    builder.addCase(fetchDisease.pending, state => {
      state.loading = true;
      state.error = '';
    });
  },
});

export default diseaseSlice;
export const {updateDisease} = diseaseSlice.actions;
