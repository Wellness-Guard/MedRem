import {createAsyncThunk} from '@reduxjs/toolkit';
import {GetRequest} from '../../utils/Request';
const BASE_URL = process.env.BASE_URL!;
const MEDICATION_PATH = process.env.MEDICATION_PATH!;
const API_URL = BASE_URL + MEDICATION_PATH;
export const fetchUserMedications = createAsyncThunk(
  'medicationHistory/fetch',
  async (flag: boolean, {rejectWithValue}) => {
    try {
      const result = await GetRequest({
        url: `${API_URL}/medications`,
      });
      console.log('Result', result);
      return result;
    } catch (err) {
      rejectWithValue(err);
    }
  },
);
