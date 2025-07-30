import {createAsyncThunk} from '@reduxjs/toolkit';
import {GetRequest, PostRequest} from '../../utils/Request';
const BASE_URL = process.env.BASE_URL!;
const NOTIFICATION_PATH = process.env.NOTIFICATION_PATH!;
const API_URL = BASE_URL + NOTIFICATION_PATH;
export const saveTrack = createAsyncThunk(
  'track/saveTrack',
  async (
    {medication_id, routine}: {medication_id: string; routine: string},
    {rejectWithValue},
  ) => {
    try {
      const result = await PostRequest({
        url: `${API_URL}/track`,
        body: {
          routine,
          taken: true,
          medication_id,
          date: new Date(Date.now()),
        },
      });
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getTracks = createAsyncThunk(
  'track/getTracks',
  async (medication_id: string, {rejectWithValue}) => {
    try {
      const result = await GetRequest({
        url: `${API_URL}/tracks/${medication_id}`,
      });
      console.log('Result', result);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
