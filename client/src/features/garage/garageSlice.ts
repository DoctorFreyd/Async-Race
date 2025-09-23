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
    // Get Cars
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
    // Create Car
    builder
      .addCase(carsAPI.createCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(carsAPI.createCar.fulfilled, (state, action) => {
        state.loading = false;
        state.cars.push(action.payload);
      })
      .addCase(carsAPI.createCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to create car';
      });
    // Update Car
    builder
      .addCase(carsAPI.updateCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(carsAPI.updateCar.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = state.cars.map((car) => (car.id === action.payload.id ? action.payload : car));
      })
      .addCase(carsAPI.updateCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to update car';
      });
    // Delete Car
    builder
      .addCase(carsAPI.deleteCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(carsAPI.deleteCar.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = state.cars.filter((car) => car.id !== action.meta.arg);
      })
      .addCase(carsAPI.deleteCar.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Failed to delete car';
      });
  },
});

export default garageSlice.reducer;
