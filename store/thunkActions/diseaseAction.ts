import {createAsyncThunk} from '@reduxjs/toolkit';
import {GetRequest} from '../../utils/Request';
const BASE_URL = process.env.BASE_URL!;
const MEDICATION_PATH = process.env.MEDICATION_PATH!;
const API_URL = BASE_URL + MEDICATION_PATH;
export const fetchDisease = createAsyncThunk(
  'disease/fetchDisease',
  async (flag: boolean, {rejectWithValue}) => {
    try {
      const result = await GetRequest({url: `${API_URL}/diseases`});
      return result;
    } catch (error) {
      console.log('failed with error', error);
      rejectWithValue(error);
    }
  },
);
