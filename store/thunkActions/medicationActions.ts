import {createAsyncThunk} from '@reduxjs/toolkit';
import {Medication} from '../../global/types';
import {PatchRequest, PostRequest} from '../../utils/Request';
const BASE_URL = process.env.BASE_URL!;
const MEDICATION_PATH = process.env.MEDICATION_PATH!;
const API_URL = BASE_URL + MEDICATION_PATH;
export const postMedication = createAsyncThunk(
  'medication/postMedication',
  async (
    {disease, start_date, end_date, days, name}: Medication,
    {rejectWithValue},
  ) => {
    try {
      const result = await PostRequest({
        url: `${API_URL}/medication`,
        body: {days, disease, start_date, end_date, name},
      });
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updateMedication = createAsyncThunk(
  'medication/updateMedication',
  async ({status, doses, _id}: Medication, {rejectWithValue}) => {
    try {
      const result = await PatchRequest({
        url: `${API_URL}/medication/${_id}`,
        body: {status, doses},
      });
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
