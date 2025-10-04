import { createSlice } from '@reduxjs/toolkit';
import type { Winner } from './types';
import { winnersAPI } from '../../api';

interface WinnersState {
  winners: Winner[];
  loading: boolean;
  error: string | null;
}

const initialState: WinnersState = { winners: [], loading: false, error: null };

export const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(winnersAPI.createWinner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(winnersAPI.createWinner.fulfilled, (state, action) => {
        state.loading = false;
        const existingIndex = state.winners.findIndex((w) => w.id === action.payload.id);
        if (existingIndex !== -1) {
          state.winners[existingIndex] = action.payload;
        } else {
          state.winners.push(action.payload);
        }
      })
      .addCase(winnersAPI.createWinner.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload as string | null;
      });
  },
});

export default winnersSlice.reducer;
