import {createSlice} from '@reduxjs/toolkit';
import {fetchUserMedications} from '../thunkActions/medicationHistoryAction';
import {Medication} from '../../global/types';

const initialState = {
  medications: [],
  selectedMedication: {} as Medication,
  completedMedication: 0,
  ongoingMedication: 0,
};

const medicationHistorySlice = createSlice({
  name: 'medicationHistory',
  initialState: {
    ...initialState,
    loading: false,
    error: '',
    success: '',
  },
  reducers: {
    fetchMedicationDetail: (state, {payload}) => {
      state.loading = true;
      const {medication_id} = payload;
      const filtered_medication = state.medications.filter(
        (medication: Medication) => medication._id === medication_id,
      );
      state.selectedMedication = filtered_medication[0] as Medication;
      state.loading = false;
    },
    unselectMedication: state => {
      state.selectedMedication = {} as Medication;
    },
    calculateMedications: state => {
      state.completedMedication = 0;
      state.ongoingMedication = 0;
      state.medications.map((medication: Medication) => {
        if (medication.status === 'Started') {
          state.ongoingMedication++;
        } else if (medication.status === 'Finished') {
          state.completedMedication++;
        }
      });
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserMedications.fulfilled, (state, {payload}) => {
      console.log('Payload', payload);
      state.medications = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchUserMedications.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload as string;
      console.log('failed', payload);
    });
    builder.addCase(fetchUserMedications.pending, state => {
      state.loading = true;
      state.error = '';
    });
  },
});

export default medicationHistorySlice;
export const {fetchMedicationDetail, unselectMedication, calculateMedications} =
  medicationHistorySlice.actions;
