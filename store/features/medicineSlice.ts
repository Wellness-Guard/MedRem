import {createSlice} from '@reduxjs/toolkit';
import {fetchMedicine} from '../thunkActions/medicineAction';
const initialState = {
  medicines: [],
};

const medicineSlice = createSlice({
  name: 'medicine',
  initialState: {
    ...initialState,
    loading: false,
    error: '',
    success: '',
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMedicine.fulfilled, (state, {payload}) => {
      state.error = '';
      const {medicines} = payload.data;
      state.medicines = medicines.map((medicine: string) => {
        return {name: medicine};
      });
      state.loading = false;
    });
    builder.addCase(fetchMedicine.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload as string;
    });
    builder.addCase(fetchMedicine.pending, state => {
      state.loading = true;
      state.error = '';
    });
  },
});

export default medicineSlice;
