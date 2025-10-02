import { createSlice } from '@reduxjs/toolkit';
import type { Car, CarRaceState } from './types';
import { carsAPI } from '../../api';

interface GarageState {
  cars: Car[];
  loading: boolean;
  error: string | null;
  selectedCarId: number | null;
}

const initialState: GarageState = { cars: [], loading: false, error: null, selectedCarId: null };

export const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    selectCar: (state, action: { payload: number }) => {
      state.selectedCarId = action.payload;
    },
    updateRace: (state, action: { payload: { id: number; race: CarRaceState } }) => {
      const car = state.cars.find((c) => c.id === action.payload.id);
      if (car) {
        car.race = action.payload.race;
      }
    },
  },
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
      })
      // Create Car
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
      })
      // Update Car
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
      })
      // Delete Car
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
      })
      // Create Random Cars
      .addCase(carsAPI.createRandomCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(carsAPI.createRandomCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars.push(...action.payload);
      })
      .addCase(carsAPI.createRandomCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Car Engine
      // Start
      .addCase(carsAPI.startEngine.fulfilled, (state, action) => {
        const { id, velocity, distance } = action.payload;
        const car = state.cars.find((c) => c.id === id);
        if (car) {
          // track width in pixels
          const trackWidth = 600;
          const finishOffset = 70;
          const maxPosition = trackWidth - finishOffset;
          // scaling coefficient
          const scale = maxPosition / distance;
          const uiDistance = distance * scale;
          // duration calculated based on UI distance
          const duration = Math.round((uiDistance / velocity) * 1000);
          car.race = {
            isMoving: true,
            position: uiDistance,
            durationMs: duration,
          };
        }
      })
      // Stop
      .addCase(carsAPI.stopEngine.fulfilled, (state, action) => {
        const car = state.cars.find((c) => c.id === action.payload.id);
        if (car) {
          car.race = { isMoving: false, position: 0, durationMs: 0 };
        }
      });
  },
});

export const { selectCar, updateRace } = garageSlice.actions;
export default garageSlice.reducer;
