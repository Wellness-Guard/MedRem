import authSlice from './features/authSlice';
import notificationSlice from './features/notificationSlice';
import diseaseSlice from './features/diseaseSlice';
import medicationSlice from './features/medicationSlice';
import medicineSlice from './features/medicineSlice';
import medicationHistorySlice from './features/medicationHistorySlice';
import trackSlice from './features/trackSlice';
import {enableMapSet} from 'immer';
import {combineReducers} from '@reduxjs/toolkit';

enableMapSet();
const reducer = combineReducers({
  auth: authSlice.reducer,
  notification: notificationSlice.reducer,
  disease: diseaseSlice.reducer,
  medication: medicationSlice.reducer,
  medicine: medicineSlice.reducer,
  medicationHistory: medicationHistorySlice.reducer,
  track: trackSlice.reducer,
});

export default reducer;
