import {createSlice} from '@reduxjs/toolkit';
import {Medication} from '../../global/types';
import {
  postMedication,
  updateMedication,
} from '../thunkActions/medicationActions';
const initialState: Medication = {
  _id: '',
  disease: '',
  status: '',
  days: 0,
  start_date: null,
  end_date: null,
  doses: null,
};
const medicationSlice = createSlice({
  name: 'medication',
  initialState: {
    ...initialState,
    loading: false,
    error: '',
    success: '',
  },
  reducers: {
    flushMediction: state => {
      state.error = '';
      state.success = '';
      state._id = '';
      state.disease = '';
      state.status = '';
      state.days = 0;
      state.start_date = null;
      state.end_date = null;
      state.doses = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(postMedication.fulfilled, (state, {payload}) => {
      state.error = '';
      const {_id, days, disease, doses, end_date, start_date, name, status} =
        payload.data;
      state._id = _id;
      state.days = days;
      state.disease = disease;
      state.doses = doses;
      state.start_date = start_date;
      state.end_date = end_date;
      state.name = name;
      state.status = status;
      state.loading = false;
    });
    builder.addCase(postMedication.rejected, (state, {payload}) => {
      state.success = '';
      state.loading = false;
      state.error = payload as string;
      console.log('error', state.error);
    });
    builder.addCase(postMedication.pending, state => {
      state.success = '';
      state.loading = true;
      state.error = '';
    });

    // extra reducer for update current medication

    builder.addCase(updateMedication.fulfilled, (state, {payload}) => {
      state.error = '';
      const {_id, days, disease, doses, end_date, start_date, name, status} =
        payload.data;
      console.log('changed');
      state._id = _id;
      state.days = days;
      state.disease = disease;
      state.doses = doses;
      state.start_date = start_date;
      state.end_date = end_date;
      state.name = name;
      state.status = status;
      state.loading = false;
      state.success = 'Medication Reminder Started Successfully ';
      console.log('success');
    });
    builder.addCase(updateMedication.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload as string;
      state.success = '';
    });
    builder.addCase(updateMedication.pending, state => {
      state.loading = true;
      state.error = '';
      state.success = '';
    });
  },
});

export default medicationSlice;

export const {flushMediction} = medicationSlice.actions;
