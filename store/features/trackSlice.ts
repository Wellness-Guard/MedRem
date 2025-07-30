import {createSlice} from '@reduxjs/toolkit';
import {Track, TrackArray} from '../../global/types';
import {getTracks, saveTrack} from '../thunkActions/trackAction';
const initialState = {
  data: [] as TrackArray,
  mapTrack: new Map(),
};

const trackSlice = createSlice({
  name: 'track',
  initialState: {
    ...initialState,
    loading: false,
    error: '',
    success: '',
  },
  reducers: {
    resetTrack: state => {
      console.log('it is called');
      state.success = '';
      state.error = '';
      state.data = [] as TrackArray;
    },
  },
  extraReducers: builder => {
    builder.addCase(saveTrack.fulfilled, (state, {payload}) => {
      state.error = '';
      state.loading = false;
      state.success = 'Track Created Successfully!';
    });
    builder.addCase(saveTrack.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload as string;
      console.log('error', payload);
    });
    builder.addCase(saveTrack.pending, state => {
      state.loading = true;
      state.error = '';
      state.success = '';
    });
    // get tracks
    builder.addCase(getTracks.fulfilled, (state, {payload}) => {
      state.success = '';
      state.error = '';
      state.data = payload.data;
      let obj = new Map();
      state.data.map(({date, taken}: Track) => {
        let strDate = new Date(date).toISOString().split('T')[0];
        if (obj.has(strDate)) {
          if (taken === true) {
            obj.set(strDate, obj.get(strDate) + 1);
          }
        } else {
          obj.set(strDate, 1);
        }
      });
      state.mapTrack = obj;
      state.loading = false;
    });
    builder.addCase(getTracks.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload as string;
      console.log('error', payload);
    });
    builder.addCase(getTracks.pending, state => {
      state.loading = true;
      state.error = '';
      state.success = '';
    });
  },
});

export default trackSlice;
export const {resetTrack} = trackSlice.actions;
