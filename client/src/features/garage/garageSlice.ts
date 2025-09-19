import { createSlice } from '@reduxjs/toolkit';
import type { Car } from './types';
import { carsAPI } from '../../api';

interface GarageState {
  cars: Car[];
  loading: boolean;
  error: string | null;
}

const initialState: GarageState = { cars: [], loading: false, error: null };

export const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(carsAPI.getCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(carsAPI.getCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(carsAPI.getCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load cars';
      });
  },
});

export default garageSlice.reducer;
