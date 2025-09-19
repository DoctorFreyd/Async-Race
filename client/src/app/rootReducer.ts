import { combineReducers } from '@reduxjs/toolkit';
import garageReducer from '../features/garage/garageSlice';
import winnersReducer from '../features/winners/winnersSlice';

export const rootReducer = combineReducers({
  garage: garageReducer,
  winners: winnersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
